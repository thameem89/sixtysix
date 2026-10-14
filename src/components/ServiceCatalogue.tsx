"use client";
import { useState } from "react";
import { ArrowUpRight, Plus, Clock } from "lucide-react";
import {
  categories,
  services,
  servicePrice,
  type Service,
} from "@/data/services";
import { track } from "@/data/salon";
import { Modal, RequestButton, WhatsApp } from "./StudioProvider";
import EditorialImage from "./EditorialImage";
export default function ServiceCatalogue() {
  const [selected, setSelected] = useState<Service | null>(null);
  return (
    <>
      <div className="category-nav">
        <nav aria-label="Service categories">
          {categories.map((c) => (
            <a href={`#${c.id}`} key={c.id}>
              {c.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="catalogue section">
        <p className="price-notice">
          AN ADVANCE LOOK / Illustrative services. The final collection, timings
          and prices will be confirmed before opening.
        </p>
        {categories.map((category, index) => (
          <section
            key={category.id}
            className={`catalogue-category ${index % 2 ? "reversed" : ""}`}
            id={category.id}
          >
            <div className="category-photography">
              <EditorialImage
                imageKey={category.imageKey}
                sizes="(max-width:700px) 90vw, 44vw"
              />
              <span className="photo-caption">
                0{index + 1} / {category.subtitle.toUpperCase()}
              </span>
              {["beard", "shaving", "skin"].includes(category.id) && (
                <div className="category-detail-image">
                  <EditorialImage
                    imageKey={category.detailKey}
                    sizes="(max-width:700px) 35vw, 18vw"
                  />
                </div>
              )}
            </div>
            <div className="category-menu">
              <p className="eyebrow">0{index + 1} / THE COLLECTION</p>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <div className="service-list">
                {services
                  .filter((s) => s.category === category.id)
                  .map((service) => (
                    <article className="service-row" key={service.id}>
                      <button
                        className="service-info"
                        onClick={() => {
                          setSelected(service);
                          track("service_viewed", { service: service.name });
                        }}
                      >
                        <span className="service-name">
                          {service.name}
                          <Plus size={16} />
                        </span>
                        <span className="service-description">
                          {service.shortDescription}
                        </span>
                        {service.duration && service.confirmed && (
                          <span className="duration">
                            {service.duration} min
                          </span>
                        )}
                      </button>
                      <div className="service-price">
                        <span>{servicePrice(service)}</span>
                        <RequestButton
                          className="text-link"
                          kind="appointment"
                          service={service.name}
                        >
                          Enquire <ArrowUpRight size={14} />
                        </RequestButton>
                      </div>
                    </article>
                  ))}
              </div>
              <WhatsApp service={category.name} />
            </div>
          </section>
        ))}
      </div>
      {selected && (
        <Modal
          title={selected.name}
          className="service-detail-modal"
          onClose={() => setSelected(null)}
        >
          <div className="detail-photograph">
            <EditorialImage
              imageKey={
                categories.find((c) => c.id === selected.category)!.detailKey
              }
              sizes="(max-width:700px) 90vw, 600px"
            />
          </div>
          <p className="eyebrow">THE COLLECTION / SERVICE PREVIEW</p>
          <h2>{selected.name}</h2>
          <p className="modal-intro">{selected.description}</p>
          <div className="detail-meta">
            <span>
              <Clock size={17} />
              {selected.duration && selected.confirmed
                ? `${selected.duration} minutes`
                : "Timing discussed on enquiry"}
            </span>
            <span>{servicePrice(selected)}</span>
          </div>
          {selected.preparation && (
            <>
              <h4>Before your visit</h4>
              <p>{selected.preparation}</p>
            </>
          )}
          {selected.aftercare && (
            <>
              <h4>After your visit</h4>
              <p>{selected.aftercare}</p>
            </>
          )}
          <div className="detail-actions">
            <RequestButton kind="appointment" service={selected.name}>
              Request this service <ArrowUpRight size={17} />
            </RequestButton>
            <WhatsApp service={selected.name} />
          </div>
        </Modal>
      )}
    </>
  );
}
