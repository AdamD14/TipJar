"use client";

import Button from "@/components/ui/buttons/Button";

const Signup = () => (
  <section
    id="signup"
    className="py-16 bg-surface-app text-center"
  >
    <h2 className="text-3xl font-heading font-bold text-gold-400 mb-6">
      Ready to earn with tips?
    </h2>
    <p className="mb-8 font-body text-text-ds-secondary max-w-lg mx-auto">
      Sign up as a creator and launch your tipping page today.
    </p>
    <Button variant="primary" size="lg">
      Sign Up as Creator
    </Button>
    <p className="mt-4 font-body text-sm text-text-ds-tertiary">
      Already have an account?{" "}
    <Button variant="link" href="/login">
      Log In
    </Button>
    </p>
  </section>
);

export default Signup;
