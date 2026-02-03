import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import CryptoTable from "./CryptoTable";
import GeminiChat from "./GeminiChat";


export default function App() {
const [user, setUser] = useState(null);


useEffect(() => {
auth.onAuthStateChanged(setUser);
}, []);


return (
<div className="p-6">
<h1 className="text-3xl font-bold">🚀 CRYPTOHUB</h1>


{!user ? (
<button onClick={() => signInWithPopup(auth, provider)}>
Sign in with Google
</button>
) : (
<>
<button onClick={() => signOut(auth)}>Logout</button>
<CryptoTable />
<GeminiChat />
</>
)}
</div>
);
}