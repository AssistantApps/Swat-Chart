import { Component } from 'solid-js';
import { packageMeta } from '../../dist/swat.export';

export const Footer: Component = () => {
  return (
    <section class="footer noselect">
      <span>© AssistantApps. All rights reserved.</span>
      <span>&nbsp;|&nbsp;</span>
      <span>
        <a
          href="https:/assistantapps.com/privacy_policy.html"
          target="_blank"
          rel="noopener noreferrer"
          title="Privacy Policy"
        >
          Privacy Policy
        </a>
      </span>
      <span>
        <a
          href="https:/assistantapps.com/terms_and_conditions.html"
          target="_blank"
          rel="noopener noreferrer"
          title="Terms and Conditions"
        >
          Terms &amp; Conditions
        </a>
      </span>
      <span>&nbsp;|&nbsp;</span>
      <span>
        <a
          href={`https://github.com/AssistantApps/Swat-Chart/commit/${packageMeta().gitCommitHash}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Package version"
        >
          {(packageMeta().packageVersion?.length ?? 0) > 0 ? packageMeta().packageVersion : '0.0.0'}
        </a>
      </span>
    </section>
  );
};
