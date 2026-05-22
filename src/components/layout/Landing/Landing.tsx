import { signInWithGoogle } from "../../../utils/supabase";
import { BetaSignup } from "../../ui/BetaSignup";

import { Button } from "../../ui/Button";
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
        <span className="beta-badge">beta</span>
        <div className="landing-actions">
          <BetaSignup source="job-tracker" onSignIn={signInWithGoogle} />
          <Button className="landing-demo-btn" onClick={onDemo}> View demo </Button>
        </div>
      </div>
    </div>
  );
}