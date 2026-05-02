import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();
    console.log(`Processing contact form from: ${name} <${email}>`);

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailAppPassword) {
      throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD secrets.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"ScriptsPlay" <${gmailUser}>`,
      to: "hello@scriptsplay.com",
      replyTo: email,
      subject: `📬 New Message from ${name} via ScriptsPlay`,
      text: [
        `You received a new contact form submission:`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        `${message}`,
        ``,
        `---`,
        `Hit Reply to respond directly to ${name}.`,
      ].join("\n"),
    });

    console.log("Email sent successfully to hello@scriptsplay.com");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Edge function error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
