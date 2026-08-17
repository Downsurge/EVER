import Image from "next/image";
import Link from "next/link";
import { routeStages } from "@/data/process";
import { routes, services } from "@/data/site";
import { publishableCategories, statusLabel } from "@/data/accepted-items";
import { cities, isCityPublishable, serviceAreaStatement } from "@/data/service-areas";
import { ItemIcon } from "./ItemIcon";
import { veteranOwnership } from "@/data/trust";
import { isPublishable } from "@/data/verification";
import styles from "./HomeSections.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" focusable="false" aria-hidden="true">
      <path d="M4 12h14m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcessIcon({ kind }: { kind: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const shapes: Record<string, React.ReactNode> = {
    receive: <><path {...common} d="M3 7h11v10H3zM14 11h3l3 3v3h-6z"/><circle {...common} cx="7" cy="19" r="1.5"/><circle {...common} cx="17" cy="19" r="1.5"/></>,
    identify: <><rect {...common} x="4" y="3" width="16" height="18" rx="2"/><path {...common} d="M8 8h8M8 12h5M8 16h7"/><path {...common} d="M16.5 15.5l1.5 1.5 3-3"/></>,
    recover: <><circle {...common} cx="12" cy="12" r="8"/><path {...common} d="M12 6v12M9 9.5c0-1 1.2-1.8 3-1.8 2 0 3 1 3 2.2 0 3-6 1.2-6 4.2 0 1.3 1.2 2.2 3.2 2.2 1.8 0 2.9-.7 3.2-1.8"/></>,
    reuse: <><path {...common} d="M6.2 8.5A7 7 0 0 1 18.5 7L20 9M17.8 15.5A7 7 0 0 1 5.5 17L4 15"/><path {...common} d="M20 5v4h-4M4 19v-4h4"/></>,
    recycle: <><path {...common} d="M9.2 6.2 12 2l2.8 4.2M12 2v5.1c0 1.1.9 2 2 2h2.2"/><path {...common} d="m18.4 9.2 3.6 2.8-3.6 2.8M22 12h-5.1c-1.1 0-2 .9-2 2v2.2"/><path {...common} d="m10 18.2-4.8.6.6-4.8M5.2 18.8l2.6-4.4c.6-1 .2-2.2-.7-2.8L5.2 10.5"/></>,
  };
  return <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">{shapes[kind]}</svg>;
}

export function QuickAnswerScene() {
  const categories = publishableCategories().slice(0, 8);
  return (
    <section className={styles.quick} aria-labelledby="quick-heading">
      <div className={`ever-shell ${styles.quickGrid}`}>
        <div className={`${styles.quickIntro} ever-reveal`}>
          <h2 id="quick-heading" className="ever-section-title">Check an item before you bring it.</h2>
          <p className="ever-lede">Pick an item and get a clear acceptance answer. No quote form just to learn whether we handle it.</p>
          <Link className={styles.primaryAction} href={routes.residential}>Check an item <Arrow /></Link>
        </div>

        <div className={styles.itemDeck}>
          <ul className={styles.categoryPreview}>
            {categories.map((category) => (
              <li key={category.slug} className="ever-reveal-soft">
                <Link href={`${routes.residential}?item=${category.slug}`} className={styles.categoryCard} data-status={category.policy.value.status}>
                  <span className={styles.iconTile}><ItemIcon icon={category.icon} size={34} /></span>
                  <span className={styles.categoryCopy}>
                    <strong>{category.name}</strong>
                    <small>{statusLabel(category.policy.value.status).replace("Accepted: ", "")}</small>
                  </span>
                  <span className={styles.miniArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function EquipmentVisualScene() {
  const visuals = [
    { src: "/brand/device-phone.svg", label: "Phones & tablets", href: `${routes.residential}?item=phones-tablets` },
    { src: "/brand/device-monitor.svg", label: "Monitors", href: `${routes.residential}?item=monitors` },
    { src: "/brand/device-components.svg", label: "Computer components", href: `${routes.residential}?item=components` },
    { src: "/brand/device-printer.svg", label: "Printers & scanners", href: `${routes.residential}?item=printers` },
  ];

  return (
    <section className={styles.visualStrip} aria-label="Electronics EVER handles">
      <div className={`ever-shell ${styles.visualStripGrid}`}>
        {visuals.map((visual) => (
          <Link key={visual.label} href={visual.href} className={`${styles.visualStripCard} ever-reveal-soft`}>
            <Image src={visual.src} alt="" width={320} height={220} className={styles.visualStripImage} />
            <span>{visual.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CommercialScene() {
  if (!isPublishable(services.businessPickup)) return null;
  return (
    <section className={styles.commercial} aria-labelledby="commercial-heading">
      <div className={styles.commercialGridLine} aria-hidden="true" />
      <div className={`ever-shell ${styles.commercialGrid}`}>
        <div className="ever-reveal">
          <h2 id="commercial-heading" className={styles.commercialHeading}>Business electronic pickup.</h2>
          <p className={styles.commercialCopy}>Free commercial pickup starts at 10 qualifying items. Smaller loads can use drop-off or a distance-based pickup. EVER helps route equipment toward recovery, reuse, or recycling.</p>
          <Link className={styles.lightAction} href={routes.business}>Plan a pickup <Arrow /></Link>
        </div>

        <div className={`${styles.businessVisual} ever-reveal`} aria-hidden="true">
          <div className={styles.assetStack}>
            {[
              { src: "/brand/device-laptop.svg", label: "LAPTOPS" },
              { src: "/brand/device-server.svg", label: "SERVERS" },
              { src: "/brand/device-network.svg", label: "NETWORKING" },
              { src: "/brand/device-drives.svg", label: "DRIVES" },
            ].map((asset) => (
              <figure key={asset.label} className={styles.assetCard}>
                <Image src={asset.src} alt="" width={320} height={220} className={styles.assetImage} />
                <figcaption>{asset.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.businessRoute}>
            <span className={styles.routeLine} />
            <div><small>01</small><strong>IDENTIFY</strong></div>
            <div><small>02</small><strong>RECOVER</strong></div>
            <div><small>03</small><strong>REUSE</strong></div>
            <div><small>04</small><strong>RECYCLE</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RouteScene() {
  if (!isPublishable(routeStages)) return null;
  const stages = routeStages.value;
  return (
    <section className={styles.route} id="process" aria-labelledby="route-heading">
      <div className="ever-shell">
        <div className={styles.routeHeader}>
          <div className="ever-reveal">
            <h2 id="route-heading" className="ever-section-title">How EVER handles electronics.</h2>
          </div>
          <p className={`ever-lede ${styles.routeLede}`}>Every item is evaluated before it is reused, recovered for parts, or recycled.</p>
        </div>

        <ol className={styles.stages}>
          <span className={`${styles.stageRoute} ever-route-draw`} aria-hidden="true" />
          {stages.map((stage, index) => (
            <li key={stage.key} className={`${styles.stage} ever-reveal`}>
              <div className={styles.stageTop}>
                <span className={styles.stageIcon}><ProcessIcon kind={stage.key} /></span>
                <span className={styles.stageIndex}>{String(index + 1).padStart(2,"0")}</span>
              </div>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ValueRecoveryScene() {
  return (
    <section className={styles.value} aria-labelledby="value-heading">
      <div className={`ever-shell ${styles.valueGrid}`}>
        <div className="ever-reveal">
          <h2 id="value-heading" className="ever-section-title">Recover value before recycling.</h2>
          <p className="ever-lede">Eligible servers, laptops, networking equipment, and components may still hold value. EVER evaluates first instead of assuming every item belongs in one bulk stream.</p>
          <p className={styles.valueCaveat}>Evaluation is not a promise of payment. Some equipment is worth recovering, and plenty is not.</p>
        </div>

        <div className={`${styles.compare} ever-reveal`}>
          <fieldset className={styles.compareControl}>
            <legend className={styles.compareLegend}>See the difference</legend>
            <input type="radio" name="ever-approach" id="approach-recycle" className={`${styles.compareInput} ${styles.inputRecycle}`} defaultChecked />
            <label htmlFor="approach-recycle" className={styles.compareOption}>Recycle everything</label>
            <input type="radio" name="ever-approach" id="approach-evaluate" className={`${styles.compareInput} ${styles.inputEvaluate}`} />
            <label htmlFor="approach-evaluate" className={styles.compareOption}>Evaluate first</label>
          </fieldset>

          <div className={styles.pathCanvas}>
            <div className={`${styles.comparePanel} ${styles.panelRecycle}`}>
              <div className={styles.inputPile}>
                <ItemIcon icon="laptop" size={30}/><ItemIcon icon="server" size={30}/><ItemIcon icon="network" size={30}/>
              </div>
              <span className={styles.pathArrow}>→</span>
              <div className={styles.singleOutcome}><strong>ONE BULK PATH</strong><small>Material recycling</small></div>
            </div>

            <div className={`${styles.comparePanel} ${styles.panelEvaluate}`}>
              <div className={styles.inputPile}>
                <ItemIcon icon="laptop" size={30}/><ItemIcon icon="server" size={30}/><ItemIcon icon="network" size={30}/>
              </div>
              <span className={styles.pathArrow}>→</span>
              <div className={styles.outcomeFan}>
                <span>REUSE</span><span>RECOVER</span><span>PARTS</span><span>RECYCLE</span>
              </div>
            </div>
          </div>
          <p className={styles.compareNote}>EVER&rsquo;s approach keeps more options open until the equipment has actually been evaluated.</p>
        </div>
      </div>
    </section>
  );
}

export function LocalServiceScene() {
  if (!isPublishable(serviceAreaStatement)) return null;
  return (
    <section className={styles.local} aria-labelledby="local-heading">
      <div className={`ever-shell ${styles.localGrid}`}>
        <div className="ever-reveal">
          <h2 id="local-heading" className="ever-section-title">Serving the East Valley.</h2>
          <p className="ever-lede">EVER serves East Valley communities while keeping the experience simple: check residential items online and plan commercial pickups by city.</p>
          <div className={styles.serviceActions}>
            <Link href={routes.residential}>Check an item <Arrow /></Link>
            <Link href={routes.business}>Business pickup <Arrow /></Link>
          </div>
        </div>

        <div className={`${styles.citySchematic} ever-reveal`} aria-label="EVER East Valley service areas">
          <span className={styles.schematicLineA} aria-hidden="true" />
          <span className={styles.schematicLineB} aria-hidden="true" />
          {cities.map((city) => {
            const content = <><span className={styles.cityDot} aria-hidden="true"/><strong>{city.name}</strong><small>{city.county}</small></>;
            return isCityPublishable(city) ? (
              <Link key={city.slug} href={`/areas/${city.slug}`} className={styles.cityNode} data-city={city.slug}>{content}</Link>
            ) : (
              <div key={city.slug} className={styles.cityNode} data-city={city.slug}>{content}</div>
            );
          })}
          <div className={styles.schematicBadge}><span>EVER</span><small>EAST VALLEY</small></div>
        </div>
      </div>
    </section>
  );
}

export function TrustScene() {
  const items = [
    isPublishable(veteranOwnership) ? { title: veteranOwnership.value.label, detail: "Locally operated in Arizona's East Valley.", icon: "★" } : null,
    { title: "Clear acceptance rules", detail: "The item checker shows the published policy in one place.", icon: "✓" },
    isPublishable(services.businessPickup) ? { title: "Business pickup", detail: "Commercial equipment can start with a structured pickup brief.", icon: "→" } : null,
  ].filter(Boolean) as {title:string; detail:string; icon:string}[];

  return (
    <section className={styles.trust} aria-label="Why EVER">
      <div className={`ever-shell ${styles.trustGrid}`}>
        {items.map((item) => (
          <div key={item.title} className={`${styles.trustItem} ever-reveal-soft`}>
            <span className={styles.trustIcon} aria-hidden="true">{item.icon}</span>
            <div><strong>{item.title}</strong><p>{item.detail}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalDecisionScene() {
  return (
    <section className={styles.final} aria-labelledby="final-heading">
      <div className={styles.finalCircuit} aria-hidden="true" />
      <div className={`ever-shell ${styles.finalInner}`}>
        <h2 id="final-heading" className={`ever-section-title ${styles.finalHeading}`}>
          <span>Ready to recycle electronics?</span>
        </h2>
        <div className={styles.finalActions}>
          <Link href={routes.residential} className={styles.finalPrimary}>Check an item <Arrow /></Link>
          <Link href={routes.business} className={styles.finalSecondary}>Plan a business pickup <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
