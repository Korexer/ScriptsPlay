import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const names = [
  // Nigeria
  "Emmanuel", "Chioma", "Olumide", "Amina", "Tunde", "Ngozi", "Babajide", "Chinyere", "Ibrahim", "Fola", 
  "Kemi", "Segun", "Abigail", "Adewale", "Bose", "Chidi", "Damilola", "Efe", "Funmi", "Gboyega",
  "Habiba", "Ifeyinwa", "Jumoke", "Kayode", "Lola", "Musa", "Nneka", "Olawale", "Patience", "Qudus",
  "Rashidat", "Sade", "Taiwo", "Uche", "Victoria", "Wale", "Xavier", "Yemi", "Zainab", "Ayotunde",
  "Bamidele", "Chisom", "Dayo", "Ebi", "Farah", "Gideon", "Halima", "Ife", "Joy", "Kunle",
  "Ladi", "Modupe", "Nnamdi", "Omotola", "Precious", "Quazim", "Ronke", "Sola", "Titilayo", "Udo",
  "Valerie", "Wunmi", "Yinka", "Zik", "Abdul", "Bukky", "Chisom", "Debby", "Eniola", "Femi",
  "Goke", "Hope", "Ijeoma", "Jimi", "Kehinde", "Lucky", "Moji", "Nonye", "Obinna", "Pius",
  "Remi", "Seyi", "Toyin", "Ufuoma", "Voke", "Wura", "Yejide", "Zion", "Afolabi", "Biodun",
  "Coker", "Daba", "Esohe", "Fasola", "Gani", "Hassan", "Idowu", "Jegede", "Kalu", "Lekan",
  // Kenya
  "Mwangi", "Otieno", "Wanjiru", "Kamau", "Njeri", "Maina", "Anyango", "Kipkorir", "Mutua", "Achieng",
  "Barasa", "Chepkirui", "Dancan", "Eshiwani", "Faith", "Gathoni", "Hassan", "Irungu", "Joram", "Karanja",
  "Linet", "Moraa", "Naliaka", "Omollo", "Phyllis", "Quinter", "Rotich", "Sitienei", "Tabitha", "Umar",
  "Veronicah", "Wambua", "Xander", "Yussuf", "Zippy", "Abdi", "Bidan", "Caren", "Dulo", "Edwin",
  "Fadhili", "Gacheru", "Halima", "Ismael", "Jebet", "Kiprotich", "Leila", "Makena", "Nyambura", "Ochieng",
  "Purity", "Qali", "Rono", "Sila", "Teresia", "Ukur", "Valentine", "Wafula", "Xavier", "Yamo",
  "Zahara", "Ali", "Bery", "Chris", "Doti", "Elias", "Fibi", "Gitau", "Haron", "Ida",
  "Juma", "Koech", "Lucy", "Muthoni", "Njuguna", "Okello", "Prudence", "Qusay", "Ruto", "Salome",
  "Tirus", "Usha", "Vivian", "Waweru", "Yaya", "Zulekha", "Amos", "Beatrice", "Cyrus", "Daisy",
  "Enock", "Fancy", "Geoffrey", "Hilda", "Isaac", "Jane", "Kelvin", "Lilly", "Moses", "Naomi",
  // Canada
  "Liam", "Olivia", "Noah", "Emma", "Ethan", "Charlotte", "William", "Sophia", "James", "Amelia",
  "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Alexander", "Harper", "Sebastian", "Ava",
  "Jack", "Scarlett", "Daniel", "Grace", "Oliver", "Chloe", "Samuel", "Lily", "Jackson", "Aria",
  "Leo", "Ella", "Owen", "Madison", "Theodore", "Zoey", "Caleb", "Maya", "Felix", "Mila",
  "Nathan", "Hannah", "Ryan", "Avery", "Isaac", "Abigail", "Arlo", "Ellie", "Arthur", "Mila",
  "Hudson", "Nora", "Ezra", "Luna", "Hunter", "Eleanor", "Lincoln", "Hazel", "Grayson", "Lily",
  "Wyatt", "Aurora", "Asher", "Penelope", "Julian", "Layla", "Miles", "Riley", "Austin", "Zoey",
  "Christian", "Stella", "Aaron", "Paisley", "Landon", "Addison", "Thomas", "Victoria", "Cooper", "Natalie",
  "Everett", "Skylar", "Brooks", "Savannah", "Colton", "Anna", "Bentley", "Claire", "Sawyer", "Lucy",
  "Beauchamp", "Tremblay", "Gagnon", "Roy", "Cote", "Bouchard", "Gauthier", "Morin", "Lavoie", "Fortin",
  // US
  "Mason", "Isabella", "Jacob", "Mia", "Michael", "Abigail", "Benjamin", "Avery", "Alexander", "Evelyn",
  "Elijah", "Sofia", "Matthew", "Camila", "Samuel", "Scarlett", "Jackson", "Victoria", "Sebastian", "Madison",
  "David", "Luna", "Carter", "Grace", "Wyatt", "Chloe", "Jayden", "Penelope", "John", "Layla",
  "Owen", "Riley", "Dylan", "Zoey", "Luke", "Nora", "Gabriel", "Lily", "Anthony", "Eleanor",
  "Isaac", "Hannah", "Christopher", "Lillian", "Joshua", "Addison", "Andrew", "Aubrey", "Theodore", "Ellie",
  "Caleb", "Stella", "Ryan", "Natalie", "Asher", "Zoe", "Nathan", "Leah", "Thomas", "Hazel",
  "Leo", "Violet", "Isaiah", "Aurora", "Charles", "Savannah", "Josiah", "Audrey", "Hudson", "Brooklyn",
  "Christian", "Bella", "Hunter", "Claire", "Connor", "Skylar", "Eli", "Lucy", "Ezra", "Paisley",
  "Aaron", "Everly", "Landon", "Anna", "Adrian", "Caroline", "Jonathan", "Nova", "Nolan", "Genesis",
  "Jeremiah", "Emilia", "Easton", "Kennedy", "Elias", "Samantha", "Colton", "Maya", "Cameron", "Willow",
  // Adding more variety per request to reach ~400
  "Abimbola", "Babafemi", "Chukwudi", "Daramola", "Enitan", "Folake", "Gbolahan", "Hafsat", "Ifedayo", "Jelili",
  "Khadijah", "Lanre", "Mojisola", "Nkechi", "Olabisi", "Popoola", "Qasim", "Rotimi", "Sulaiman", "Tokunbo",
  "Uzor", "Vera", "Wale", "Xolani", "Yusuf", "Zubairu", "Adanna", "Bolanle", "Chinelo", "Dotun",
  "Ekwueme", "Fadekemi", "Gbemisola", "Hauwa", "Idris", "Jibola", "Kosiso", "Lekan", "Moyo", "Ngozika",
  "Oluchi", "Pamela", "Rasheed", "Simisola", "Tobe", "Ugochi", "Wuraola", "Yakubu", "Zoba", "Adebayo",
  "Baraka", "Chacha", "Dalila", "Eleanor", "Faraji", "Gathii", "Habon", "Imani", "Jelani", "Kalu",
  "Lulu", "Mwenye", "Njogu", "Omari", "Pesa", "Quat", "Raha", "Safi", "Tatu", "Umoja",
  "Vumilia", "Winda", "Xo", "Yasin", "Zahar", "Amani", "Bora", "Chewa", "Dunia", "Elimu",
  "Faridi", "Gani", "Hali", "Imara", "Jasiri", "Kioo", "Lala", "Mapambano", "Nuru", "Onyesha",
  "Pamoja", "Qadir", "Roshid", "Sauti", "Tegemeo", "Ushindi", "Viwandani", "Waja", "Yaya", "Zindua",
  "Brodie", "Mackenzie", "Logan", "Kaitlyn", "Tristan", "Peyton", "Brooke", "Colby", "Jordan", "Taylor",
  "Morgan", "Sydney", "Paige", "Kylie", "Bailey", "Reagan", "Hayley", "Skyler", "Kendall", "Erin",
  "Justin", "Tyler", "Brandon", "Austin", "Kyle", "Cody", "Dustin", "Travis", "Sampson", "Garrett",
  "Tanner", "Colton", "Dalton", "Wyatt", "Hunter", "Chase", "Dakota", "Skylar", "Sierra", "Cheyenne",
  "Savannah", "Montana", "Arizona", "Dakota", "Nevada", "Virginia", "Georgia", "Carolina", "Indiana", "Dallas"
];

// To make it feel like 400, we'll shuffle and pick, but a list of 160 is a good start. 
// I'll provide a more diverse set if needed, but this covers the ethnicities requested.

export const TaskCompletionPopup: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<{ name: string, time: string } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMin = Math.floor(Math.random() * 21) + 10; // 10 to 30
      const randomSec = Math.floor(Math.random() * 60);
      
      setCurrentNotification({
        name: randomName,
        time: `${randomMin}m : ${randomSec.toString().padStart(2, '0')}sec`
      });
      setVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    // Show every 15 seconds
    const interval = setInterval(showNotification, 15000);
    
    // Initial delay so it doesn't pop up immediately on load
    const initialTimeout = setTimeout(showNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 transform ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center gap-4 min-w-[280px]">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Task Completed!</p>
          <p className="text-xs text-slate-500 mt-0.5">
            <span className="font-medium text-blue-600">{currentNotification.name}</span> completed {currentNotification.time}
          </p>
        </div>
      </div>
    </div>
  );
};
