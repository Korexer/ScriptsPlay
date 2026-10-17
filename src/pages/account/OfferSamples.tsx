import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Sample { id: string; offer_id: string; object_path: string; media_type: "image" | "video" | "audio"; caption: string; position: number; url?: string }
const types: Record<string, { media: Sample["media_type"]; extension: string }> = {
  "image/jpeg": { media: "image", extension: "jpg" }, "image/png": { media: "image", extension: "png" },
  "image/webp": { media: "image", extension: "webp" }, "video/mp4": { media: "video", extension: "mp4" },
  "audio/mpeg": { media: "audio", extension: "mp3" }, "audio/mp4": { media: "audio", extension: "m4a" },
};

async function fetchSamples(offerId: string): Promise<Sample[]> {
  const { data, error } = await supabase.from("offer_media").select("*").eq("offer_id", offerId).order("position");
  if (error) throw error;
  return Promise.all(((data || []) as Sample[]).map(async (sample) => {
    const { data: signed } = await supabase.storage.from("marketplace-samples").createSignedUrl(sample.object_path, 3600);
    return { ...sample, url: signed?.signedUrl };
  }));
}

export default function OfferSamples({ offerId, userId }: { offerId: string; userId: string }) {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try { setSamples(await fetchSamples(offerId)); }
    catch { setError("Samples could not load."); }
  }, [offerId]);

  useEffect(() => {
    let active = true;
    void fetchSamples(offerId).then(
      (rows) => { if (active) setSamples(rows); },
      () => { if (active) setError("Samples could not load."); },
    );
    return () => { active = false; };
  }, [offerId]);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || busy) return;
    setError(""); setNotice("");
    const type = types[file.type];
    if (!type) { setError("Use JPG, PNG, WebP, MP4, MP3, or M4A."); return; }
    if (file.size > 50 * 1024 * 1024) { setError("A sample must be 50 MB or smaller."); return; }
    if (samples.length >= 6) { setError("This offer already has six samples."); return; }
    setBusy(true);
    const path = `${userId}/${offerId}/${crypto.randomUUID()}.${type.extension}`;
    const { error: uploadError } = await supabase.storage.from("marketplace-samples").upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) { setError(uploadError.message); setBusy(false); return; }
    const { error: recordError } = await supabase.from("offer_media").insert({ offer_id: offerId, object_path: path, media_type: type.media, caption: file.name.slice(0, 250), position: samples.length });
    if (recordError) {
      await supabase.storage.from("marketplace-samples").remove([path]);
      setError(recordError.message);
    } else { setNotice("Sample uploaded."); await load(); }
    setBusy(false);
  }

  async function remove(sample: Sample) {
    if (busy) return;
    setBusy(true); setError(""); setNotice("");
    const { error: fileError } = await supabase.storage.from("marketplace-samples").remove([sample.object_path]);
    if (fileError) { setError(fileError.message); setBusy(false); return; }
    const { error: rowError } = await supabase.from("offer_media").delete().eq("id", sample.id).eq("offer_id", offerId);
    if (rowError) setError("The file was removed, but the sample record could not be updated. Please contact support.");
    else { setNotice("Sample removed."); await load(); }
    setBusy(false);
  }

  return (
    <section className="market-sample-editor" aria-labelledby="samples-title"><h3 id="samples-title">4. Samples of your work</h3><p>Upload original work that shows what buyers can expect. Files stay private until the offer is approved and published.</p>
      {error && <p className="sp-form-error" role="alert">{error}</p>}{notice && <p className="market-form-notice" role="status">{notice}</p>}
      {samples.length > 0 && <div className="market-sample-grid">{samples.map((sample) => <div className="market-sample-item" key={sample.id}>{sample.url && (sample.media_type === "video" ? <video controls preload="none" src={sample.url} /> : sample.media_type === "audio" ? <audio controls preload="none" src={sample.url} /> : <img src={sample.url} alt={sample.caption} loading="lazy" />)}<p>{sample.caption}</p><button type="button" onClick={() => void remove(sample)} disabled={busy}><Trash2 size={15} /> Remove</button></div>)}</div>}
      <label className="market-upload"><ImagePlus size={20} /><span>{busy ? "Working…" : "Add a sample"}</span><input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,audio/mpeg,audio/mp4" onChange={(event) => void upload(event)} disabled={busy} /></label>
      <p className="sp-small">Up to six samples, 50 MB each. Use media you have the right to show.</p>
    </section>
  );
}
