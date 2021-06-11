<script>
  import { afterUpdate, tick } from "svelte";
  let fields = { NUMBER_TO_ADD: 1, NUMBER_TO_REMOVE: 1 };
  let time0 = 0;

  let array = [
    {
      id: 1,
      date: "12.04.2021",
      hour: "11:20",
      name: "Anna Kowalska",
      spec: "Rodzinny",
    },
    {
      id: 2,
      date: "12.04.2021",
      hour: "11:40",
      name: "Jan Nowak",
      spec: "Rodzinny",
    },
    {
      id: 3,
      date: "12.04.2021",
      hour: "13:20",
      name: "Marta Nowicka",
      spec: "Rodzinny",
    },
    {
      id: 4,
      date: "12.04.2021",
      hour: "15:40",
      name: "Anna Kowalska",
      spec: "Rodzinny",
    },
    {
      id: 5,
      date: "12.04.2021",
      hour: "16:20",
      name: "Marta Nowicka",
      spec: "Rodzinny",
    },
  ];

  const tableTitleRow = [
    { id: 1, name: "Data" },
    { id: 2, name: "Godzina" },
    { id: 3, name: "Imię i nazwisko" },
    { id: 4, name: "Specjalizacja" },
  ];

  const sort = () => {
    time0 = performance.now();
    array = [...array.sort((a, b) => (a.name > b.name ? 1 : -1))];
  };

  performance.mark("start");

  const add = () => {
    time0 = performance.now();

    for (let i = 0; i < fields.NUMBER_TO_ADD; i++) {
      array.push({
        id: i + 10,
        date: "12.04.2021",
        hour: "11:20",
        name: "Monika Kowalska",
        spec: "Rodzinny",
      });
    }
    array = array;
  };

  const remove = () => {
    time0 = performance.now();
    array = [...array.slice(fields.NUMBER_TO_REMOVE, array.length)];
  };

  const editAll = () => {
    time0 = performance.now();
    array = [
      ...array.map((el) => ({
        name: "Asia Kowalska",
        id: el.id,
        spec: el.spec,
        date: el.date,
        hour: el.hour,
      })),
    ];
  };

  afterUpdate(async () => {
    await tick();
    let time1 = performance.now();
    console.log(`Call to operation took${time1 - time0} milliseconds.`);
  });
</script>

<div>
  <div class="buttons-wrapper">
    <button class="button" on:click={sort}>Sort</button>
    <input
      placeholder="Podaj ilość"
      id="NUMBER_TO_ADD"
      bind:value={fields.NUMBER_TO_ADD}
    />
    <button class="button" on:click={add}>Add</button>
    <input
      placeholder="Podaj ilość"
      id="NUMBER_TO_REMOVE"
      bind:value={fields.NUMBER_TO_REMOVE}
    />
    <button class="button" on:click={remove}>Remove</button>
    <button class="button" on:click={editAll}>Edit all</button>
  </div>
  <table>
    <thead>
      <tr>
        {#each tableTitleRow as titleRow}
          <th>{titleRow.name}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each array as row}
        <tr>
          <td>{row.date}</td>
          <td>{row.hour}</td>
          <td>{row.name}</td>
          <td>{row.spec}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table,
  th,
  td {
    color: #35394a;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 1em 2em;
  }
  tr {
    border-bottom: 1px solid;
    border-color: #35394a;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  table {
    background: #fefefe;
    border-radius: 6px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    text-align: center;
  }
  .buttons-wrapper {
    justify-content: flex-start;
    display: flex;
    margin-bottom: 12px;
  }
  .button {
    margin-right: 8px;
  }
  input {
    width: 70px;
  }
</style>
