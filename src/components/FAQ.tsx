import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
export default function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div>
        <p className="eyebrow">A FEW THINGS TO KNOW</p>
        <h2>
          Before
          <br />
          <em>we begin.</em>
        </h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <details key={faq.question}>
            <summary>
              <span>0{i + 1}</span>
              <h3>{faq.question}</h3>
              <Plus size={18} />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
