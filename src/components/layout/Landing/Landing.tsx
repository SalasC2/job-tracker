import { Button } from "../../ ui/Button";
import { signInWithGoogle } from "../../../utils/supabase";

import "./Landing.css";

type LandingProps = {
  onDemo: () => void;
};

export function Landing({ onDemo }: LandingProps) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-title">Track your job search.</h1>
        <p className="landing-subtitle">
          Series A/B startups · React/JS · SF or Remote
        </p>
        <div className="landing-actions">
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          <button className="landing-demo-btn" onClick={onDemo}>
            View demo
          </button>
        </div>
      </div>
    </div>
  );
}