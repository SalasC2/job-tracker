import "./Navbar.css";

import { signOut } from '../../../utils/supabase';
import type { User } from "@supabase/supabase-js";
import jobTrackerIcon from '../../../assets/job-tracker-logo.png';

import { Button } from "../../ui/Button";
import { useTheme } from "../../../hooks/useTheme";

type NavbarProps = {
    user: User | null;
}

export const Navbar = ({ user }: NavbarProps) => {

    const userAvatar = user?.user_metadata.avatar_url ?? undefined;
    const { theme, toggle } = useTheme();

    return (
        <div className="navbar">
            <div className="navbar-left">
                <img className="jobtracker-logo" src={jobTrackerIcon} />
                <span className="navbar-brand">Job Tracker</span>
                <span className="navbar-subtitle">Series A/B · React/JS · SF or Remote</span>
            </div>
            <div className="navbar-right">
                <button
                    className="navbar-theme-btn"
                    onClick={toggle}
                    aria-label="Toggle theme"
                    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {theme === "dark" ? "☀" : "◑"}
                </button>
                {user ? (
                    <>
                        <img src={userAvatar} alt="user-avatar" className="user-avatar" />
                        <Button variant="danger" onClick={signOut}>Sign out</Button>
                    </>
                ) : null}
            </div>
        </div>
    )
}