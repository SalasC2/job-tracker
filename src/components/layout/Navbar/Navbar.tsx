import "./Navbar.css";

import { signInWithGoogle } from '../../../utils/supabase';
import { signOut } from '../../../utils/supabase';
import type { User } from "@supabase/supabase-js";
// import algovizIcon from '../../../assets/algoviz.png';

import { Button } from "../../ ui/Button";

type NavbarProps = {
    user: User | null;
}

export const Navbar = ({ user }: NavbarProps) => {

    const userAvatar = user?.user_metadata.avatar_url ?? undefined;

    return (
        <div className="navbar">
            <div className="navbar-left">
                <span className="navbar-brand">Job Tracker</span>
                <span className="navbar-subtitle">Series A/B · React/JS · SF or Remote</span>
            </div>
            <div className="navbar-right">
                {user ? (
                    <>
                        <img src={userAvatar} alt="user-avatar" className="user-avatar" />
                        <Button variant="danger" onClick={signOut}>Sign out</Button>
                    </>
                ) : (
                    <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                )}
            </div>
        </div>
    )
}