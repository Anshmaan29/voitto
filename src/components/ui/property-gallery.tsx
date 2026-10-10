import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X, Play, MessageCircle } from "lucide-react";
import { useState } from "react";
import { enquiryLink, type Property } from "@/data/content";
import { LiquidButton } from "./liquid-glass-button";

export function PropertyGallery({
  property,
  onClose,
  onRestoreFocus,
}: {
  property: Property | null;
  onClose: () => void;
  onRestoreFocus: () => void;
}) {
  const [index, setIndex] = useState(0);
  const move = (delta: number) => {
    if (property)
      setIndex(
        (i) => (i + delta + property.media.length) % property.media.length,
      );
  };
  const item = property?.media[index];
  return (
    <Dialog.Root
      open={!!property}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setIndex(0);
        }
      }}
    >
      <AnimatePresence>
        {property && item && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="dialog-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                onRestoreFocus();
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "ArrowRight" &&
                  !(e.target instanceof HTMLVideoElement)
                )
                  move(1);
                if (
                  e.key === "ArrowLeft" &&
                  !(e.target instanceof HTMLVideoElement)
                )
                  move(-1);
              }}
            >
              <motion.div
                className="gallery-dialog"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="gallery-heading">
                  <div>
                    <span className="eyebrow">{property.kind}</span>
                    <Dialog.Title>{property.name}</Dialog.Title>
                  </div>
                  <Dialog.Close
                    className="icon-button"
                    aria-label="Close property gallery"
                  >
                    <X />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="gallery-description">
                  {property.description}
                </Dialog.Description>
                <div className="gallery-stage">
                  <AnimatePresence mode="wait">
                    <motion.div
                      className="gallery-item"
                      key={`${property.slug}-${index}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.18 }}
                    >
                      {item.type === "image" ? (
                        <img src={item.src} alt={item.alt} />
                      ) : (
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          poster={item.poster}
                          aria-label={item.alt}
                        >
                          <source src={item.src} type="video/mp4" />
                        </video>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <div className="gallery-navigation">
                    <button
                      className="icon-button"
                      aria-label="Previous gallery item"
                      onClick={() => move(-1)}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <span aria-live="polite">
                      {index + 1} / {property.media.length}
                    </span>
                    <button
                      className="icon-button"
                      aria-label="Next gallery item"
                      onClick={() => move(1)}
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
                <div
                  className="gallery-thumbnails"
                  aria-label="Choose a photo or video"
                >
                  {property.media.map((media, i) => (
                    <button
                      key={media.src}
                      onClick={() => setIndex(i)}
                      aria-label={`${media.type === "video" ? "Play" : "View"} ${media.alt}`}
                      aria-pressed={index === i}
                      className={index === i ? "selected" : ""}
                    >
                      <img
                        src={
                          media.poster ??
                          media.src.replace("-1600.webp", "-800.webp")
                        }
                        alt=""
                      />
                      {media.type === "video" && <Play size={16} />}
                    </button>
                  ))}
                </div>
                <div className="gallery-footer">
                  <div className="amenities">
                    {property.amenities.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </div>
                  <LiquidButton asChild size="small">
                    <a
                      href={enquiryLink(
                        `Hello Voitto Ventures, I would like to enquire about a stay at ${property.name}. Please share availability and booking details.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={17} /> Enquire about this stay
                    </a>
                  </LiquidButton>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
