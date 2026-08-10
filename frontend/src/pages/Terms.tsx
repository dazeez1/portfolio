import { LegalLayout } from "../components/LegalLayout";
import { terms } from "../content/terms";

export default function Terms() {
  return <LegalLayout document={terms} />;
}
