export default function PrivacyCard() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-card-border bg-white px-6 py-5">
      <p className="text-[16px] leading-6 font-bold text-navy">
        Your assessment is calculated locally and is not stored.
      </p>
      <p className="text-[14px] leading-5 font-medium text-navy">
        Your answers are only shared if you choose to attach them to a contact request.
      </p>
    </div>
  )
}
