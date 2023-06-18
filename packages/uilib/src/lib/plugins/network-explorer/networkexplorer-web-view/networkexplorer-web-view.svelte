<script lang="ts">
  import InformationCard from "../../../components/information-card/information-card.svelte"
  import { PdfType, setPdfConfigurationType } from "../_store-pdf-export"

  function downloadPdf(e: CustomEvent, type: PdfType) {
  	setPdfConfigurationType(type)
  	setTimeout(() => {
  		print()
  	}, 100)
  }
</script>

<section class="network-explorer-web-content">
  <div class="pdf-downloads">
    <InformationCard on:buttonClick={(e) => downloadPdf(e, PdfType.Telegram)}>
      <span slot="header">Communication Explorer</span>
      <span slot="description"
        >Downloading the Communication Explorer including an overview about the
        whole network</span
      >
      <span slot="button-text">Download</span>
    </InformationCard>
    <InformationCard
      on:buttonClick={(e) => downloadPdf(e, PdfType.Documentation)}
    >
      <span slot="header">Documentation</span>
      <span slot="description"
        >Copy Download the Documentation including a list with all busses, bays,
        Intelligent Electronic Device IEDs, Logical Nodes (LNs), Data Attributes
        (DAs), Data Objects (DOs) and Enumerations (ENUMs).</span
      >
      <span slot="button-text">Download</span>
    </InformationCard>
  </div>
</section>

<style>
  .pdf-downloads {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media print {
    .network-explorer-web-content {
      display: none;
    }
  }
</style>
