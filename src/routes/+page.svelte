<script lang="ts">
  import { goto } from "$app/navigation";

  function openContracts() {
    goto("/contracts");
  }
</script>

<main class="cover-page">
  <section class="hero">
    <h1>BattleTech Contract Generator</h1>

    <p>
      Generate dynamic mercenary contracts, mission tracks and
      operational rights
    </p>

    <button onclick={openContracts}>
      Open Contract Board
    </button>

    <h3>What is this?</h3>
    <p>
      This Contract Generator is a GM support tool allowing for the quick creation of contracts, including suggested tracks and objectives.
      <br>
      Has been built based on the combination of Campaign Operation, Mercenaries and Hot Spot books.
      <br>
      As with all GM support tools discression is advised. This has been created for personal use.
    </p>

    <h3>How it works</h3>
    <p>
      User selects the following:
      <br>Company Name -> Has no effect on Generator
      <br>Campaign -> Focus the rules used in the Generator
      <br>Hiring Hall -> Effects number of offers/contracts, Employers and Missions Type
      <br>Scale -> Determines payout base before multiplier
      <br>With the above the contracts will generated the rest of the contracts information.
      <br>Track scenarios are high level version of the book versions, see track notes to where inspiration is taken from.
      <br>Track scenarios can be used as inspiration, GM discression advised.
    </p>

  </section>
</main>

<style>
  .cover-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background:
      linear-gradient(
        to bottom,
        #111,
        #222
      );

    color: white;
    font-family: sans-serif;
    padding: 2rem;
  }

  .hero {
    max-width: 800px;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    background: #c89b3c;
    color: black;
    font-weight: bold;
  }

  button:hover {
    background: #ddb85f;
  }
</style>