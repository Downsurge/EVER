/**
 * Unverified-content preview.
 *
 * The honest state of this site is that almost no operational fact is
 * confirmed, so most feature surfaces render their "not available yet" state.
 * That is correct for production and useless for design review: nobody can
 * approve an acceptance finder they cannot see working.
 *
 * This flag lets a reviewer run the real interface against clearly-fake
 * sample data. It is deliberately hard to ship by accident:
 *   - it is ignored entirely unless NODE_ENV is development,
 *   - every surface it unlocks renders a loud preview banner,
 *   - previewed pages are marked noindex.
 *
 * Turn it on with:  EVER_PREVIEW_UNVERIFIED=1 npm run dev
 */
export function previewUnverifiedContent(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.EVER_PREVIEW_UNVERIFIED === "1"
  );
}
