"use strict";

/** @param client { import("@datocms/cli/lib/cma-client-node").Client } */
module.exports = async function (client) {
  const newFields = {};
  const newFieldsets = {};
  const newItemTypes = {};
  const newPlugins = {};
  const newMenuItems = {};

  try {
    console.log("Manage upload filters");
    console.log('Create private plugin "Dataviz"');
    newPlugins["87709"] = await client.plugins.create({
      name: "Dataviz",
      url: "https://dataviz-plugin.netlify.app/",
      description: "https://dataviz-plugin.netlify.app/",
      package_name: null,
      package_version: null,
      permissions: ["currentUserAccessToken"],
    });

    console.log('Install plugin "Dropdown Conditional Fields"');
    newPlugins["112878"] = await client.plugins.create({
      package_name: "datocms-plugin-dropdown-conditional-fields",
    });
    await client.plugins.update(newPlugins["112878"], {
      parameters: { developmentMode: false },
    });
  } catch (error) {
    console.log(error);
  }
  console.log("Create new models/block models");

  console.log('Create model "Data visualization" (`dataviz_page`)');
  newItemTypes["992885"] = await client.itemTypes.create(
    {
      name: "Data visualization",
      singleton: true,
      api_key: "dataviz_page",
      draft_mode_active: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create model "Chart" (`chart`)');
  newItemTypes["1058312"] = await client.itemTypes.create(
    {
      name: "Chart",
      api_key: "chart",
      all_locales_required: true,
      collection_appearance: "table",
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Blocco Grafico" (`block_chart`)');
  newItemTypes["1058313"] = await client.itemTypes.create(
    {
      name: "Blocco Grafico",
      api_key: "block_chart",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create model "Elemento KPI " (`kpi_element`)');
  newItemTypes["1214176"] = await client.itemTypes.create(
    {
      name: "Elemento KPI ",
      api_key: "kpi_element",
      all_locales_required: true,
      collection_appearance: "table",
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Blocco KPI" (`kpi_block`)');
  newItemTypes["1214180"] = await client.itemTypes.create(
    {
      name: "Blocco KPI",
      api_key: "kpi_block",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Gruppo KPI" (`block_kpi`)');
  newItemTypes["1214368"] = await client.itemTypes.create(
    {
      name: "Gruppo KPI",
      api_key: "block_kpi",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Filtro" (`filter`)');
  newItemTypes["1566104"] = await client.itemTypes.create(
    {
      name: "Filtro",
      api_key: "filter",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log(
    'Create block model "Blocco Grafico no layout" (`block_chart_base`)'
  );
  newItemTypes["1566742"] = await client.itemTypes.create(
    {
      name: "Blocco Grafico no layout",
      api_key: "block_chart_base",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Gruppo KPI no layout" (`block_kpi_base`)');
  newItemTypes["1684118"] = await client.itemTypes.create(
    {
      name: "Gruppo KPI no layout",
      api_key: "block_kpi_base",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create fieldset "Contenuto" in model "Data visualization" (`dataviz_page`)'
  );
  newFieldsets["307854"] = await client.fieldsets.create(
    newItemTypes["992885"],
    { title: "Contenuto" }
  );

  console.log(
    'Create fieldset "Ontologia" in model "Data visualization" (`dataviz_page`)'
  );
  newFieldsets["307856"] = await client.fieldsets.create(
    newItemTypes["992885"],
    { title: "Ontologia", collapsible: true }
  );

  console.log(
    'Create fieldset "Metadati" in model "Data visualization" (`dataviz_page`)'
  );
  newFieldsets["307855"] = await client.fieldsets.create(
    newItemTypes["992885"],
    {
      title: "Metadati",
      hint: "Link aggiuntivi al menu dell'header della pagina",
      collapsible: true,
    }
  );

  console.log(
    'Create fieldset "SEO" in model "Data visualization" (`dataviz_page`)'
  );
  newFieldsets["307857"] = await client.fieldsets.create(
    newItemTypes["992885"],
    { title: "SEO" }
  );

  console.log(
    'Create Modular content field "Contenuti" (`content_blocks`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187695"] = await client.fields.create(newItemTypes["992885"], {
    label: "Contenuti",
    field_type: "rich_text",
    api_key: "content_blocks",
    localized: true,
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
    default_value: { it: null, en: null },
    fieldset: newFieldsets["307854"],
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187697"] = await client.fields.create(newItemTypes["992885"], {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    hint: "Attenzione: questa \u00E8 la data che viene mostrata sul sito",
    validators: { required: {} },
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: newFieldsets["307855"],
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187705"] = await client.fields.create(newItemTypes["992885"], {
    label: "SEO",
    field_type: "seo",
    api_key: "seo",
    localized: true,
    validators: {
      required_seo_fields: {
        title: true,
        description: true,
        image: false,
        twitter_card: false,
      },
      title_length: { max: 100 },
      description_length: { max: 160 },
    },
    appearance: { addons: [], editor: "seo", parameters: {} },
    default_value: { it: null, en: null },
    fieldset: newFieldsets["307857"],
  });

  console.log(
    'Create Multiple links field "Argomenti" (`tags`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187708"] = await client.fields.create(newItemTypes["992885"], {
    label: "Argomenti",
    field_type: "links",
    api_key: "tags",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["772975"],
      },
      size: { min: 1, max: 4 },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    fieldset: newFieldsets["307856"],
  });

  console.log(
    'Create Multiple links field "Targets" (`targets`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187709"] = await client.fields.create(newItemTypes["992885"], {
    label: "Targets",
    field_type: "links",
    api_key: "targets",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["772976"],
      },
      size: { min: 1 },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    fieldset: newFieldsets["307856"],
  });

  console.log(
    'Create Single-line string field "Titolo" (`title`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187710"] = await client.fields.create(newItemTypes["992885"], {
    label: "Titolo",
    field_type: "string",
    api_key: "title",
    localized: true,
    validators: { required: {}, unique: {}, length: { max: 100 } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true },
      type: "title",
    },
    default_value: { it: "", en: "" },
  });

  console.log(
    'Create Single-line string field "Sottotitolo (o descrizione)" (`subtitle`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187706"] = await client.fields.create(newItemTypes["992885"], {
    label: "Sottotitolo (o descrizione)",
    field_type: "string",
    api_key: "subtitle",
    localized: true,
    validators: { required: {}, length: { max: 160 } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: { it: "", en: "" },
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5189553"] = await client.fields.create(newItemTypes["992885"], {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5189554"] = await client.fields.create(newItemTypes["992885"], {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5189558"] = await client.fields.create(newItemTypes["992885"], {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
  });

  console.log(
    'Create Slug field "Slug" (`slug`) in model "Data visualization" (`dataviz_page`)'
  );
  newFields["5187711"] = await client.fields.create(newItemTypes["992885"], {
    label: "Slug",
    field_type: "slug",
    api_key: "slug",
    localized: true,
    validators: {
      slug_title_field: { title_field_id: newFields["5187710"].id },
      slug_format: { predefined_pattern: "webpage_slug" },
      required: {},
      unique: {},
    },
    appearance: {
      addons: [],
      editor: "slug",
      parameters: { url_prefix: null },
    },
    default_value: { it: null, en: null },
  });

  console.log(
    'Create Single-line string field "Nome" (`title`) in model "Chart" (`chart`)'
  );
  newFields["5549627"] = await client.fields.create(newItemTypes["1058312"], {
    label: "Nome",
    field_type: "string",
    api_key: "title",
    hint:
      "un nome indicativo per capire quale grafico \u00E8,  non utilizzato sul sito.",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create JSON field "Configurazione Grafico" (`chart_data`) in model "Chart" (`chart`)'
  );
  newFields["5549626"] = await client.fields.create(newItemTypes["1058312"], {
    label: "Configurazione Grafico",
    field_type: "json",
    api_key: "chart_data",
    appearance: { addons: [], editor: "json", parameters: {} },
  });

  console.log(
    'Create Single link field "Chart" (`chart`) in block model "Blocco Grafico" (`block_chart`)'
  );
  newFields["5549632"] = await client.fields.create(newItemTypes["1058313"], {
    label: "Chart",
    field_type: "link",
    api_key: "chart",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [newItemTypes["1058312"].id],
      },
      required: {},
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Blocco Grafico" (`block_chart`)'
  );
  newFields["8144545"] = await client.fields.create(newItemTypes["1058313"], {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Subtitle" (`subtitle`) in block model "Blocco Grafico" (`block_chart`)'
  );
  newFields["8144546"] = await client.fields.create(newItemTypes["1058313"], {
    label: "Subtitle",
    field_type: "string",
    api_key: "subtitle",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Multiple-paragraph text field "Info" (`info`) in block model "Blocco Grafico" (`block_chart`)'
  );
  newFields["8144547"] = await client.fields.create(newItemTypes["1058313"], {
    label: "Info",
    field_type: "text",
    api_key: "info",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      type: "markdown",
    },
    default_value: "",
  });

  console.log(
    'Create Multiple-paragraph text field "Source" (`source`) in block model "Blocco Grafico" (`block_chart`)'
  );
  newFields["8144548"] = await client.fields.create(newItemTypes["1058313"], {
    label: "Source",
    field_type: "text",
    api_key: "source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      type: "markdown",
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Layout" (`layout`) in block model "Blocco Grafico" (`block_chart`)'
  );
  newFields["8143441"] = await client.fields.create(newItemTypes["1058313"], {
    label: "Layout",
    field_type: "string",
    api_key: "layout",
    hint:
      'ATTENZIONE: si consiglia di usare le impostazioni di layout solo nel template "DASHBOARD", onde evitare visualizzazioni troppo ridotte nel template "PAGE"',
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "12/12", value: "12" },
          { hint: "", label: "7/12", value: "7" },
          { hint: "", label: "6/12", value: "6" },
          { hint: "", label: "5/12", value: "5" },
        ],
      },
    },
    default_value: "12",
  });

  console.log(
    'Create fieldset "Info aggiuntive" in model "Elemento KPI " (`kpi_element`)'
  );
  newFieldsets["377331"] = await client.fieldsets.create(
    newItemTypes["1214176"],
    { title: "Info aggiuntive", collapsible: true, start_collapsed: true }
  );

  console.log(
    'Create Boolean field "Mostra andamento" (`show_flow`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370091"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Mostra andamento",
    field_type: "boolean",
    api_key: "show_flow",
    appearance: { addons: [], editor: "boolean", parameters: {} },
    fieldset: newFieldsets["377331"],
  });

  console.log(
    'Create Single-line string field "Titolo" (`title`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370083"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Titolo",
    field_type: "string",
    api_key: "title",
    hint: "La label che appare come descrizione del valore KPI",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Direzione andamento" (`flow_direction`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6372271"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Direzione andamento",
    field_type: "string",
    api_key: "flow_direction",
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Positivo", value: "+" },
          { hint: "", label: "Negativo", value: "-" },
        ],
      },
    },
    default_value: "",
    fieldset: newFieldsets["377331"],
  });

  console.log(
    'Create Single-line string field "Valore" (`value`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370084"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Valore",
    field_type: "string",
    api_key: "value",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Valore andamento" (`flow_value`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370097"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Valore andamento",
    field_type: "string",
    api_key: "flow_value",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["377331"],
  });

  console.log(
    'Create Single-line string field "Dettaglio andamento" (`flow_detail`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370098"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Dettaglio andamento",
    field_type: "string",
    api_key: "flow_detail",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["377331"],
  });

  console.log(
    'Create Single-line string field "Colore sfondo" (`background_color`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370949"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Colore sfondo",
    field_type: "string",
    api_key: "background_color",
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Default", value: "lightgrey-bg-a3" },
          { hint: "", label: "Neutrale", value: "neutral-1-bg-a2" },
        ],
      },
    },
    default_value: "lightgrey-bg-a3",
  });

  console.log(
    'Create Single-line string field "Prefisso valore" (`value_prefix`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370086"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Prefisso valore",
    field_type: "string",
    api_key: "value_prefix",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Suffisso valore" (`value_suffix`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370087"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Suffisso valore",
    field_type: "string",
    api_key: "value_suffix",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Percentuale" (`percentage`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370090"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Percentuale",
    field_type: "string",
    api_key: "percentage",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Testo footer" (`footer_text`) in model "Elemento KPI " (`kpi_element`)'
  );
  newFields["6370096"] = await client.fields.create(newItemTypes["1214176"], {
    label: "Testo footer",
    field_type: "string",
    api_key: "footer_text",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single link field "kpi" (`kpi_element`) in block model "Blocco KPI" (`kpi_block`)'
  );
  newFields["8729959"] = await client.fields.create(newItemTypes["1214180"], {
    label: "kpi",
    field_type: "link",
    api_key: "kpi_element",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [newItemTypes["1214176"].id],
      },
      required: {},
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });

  console.log(
    'Create Single-line string field "Direzione" (`direction`) in block model "Gruppo KPI" (`block_kpi`)'
  );
  newFields["6370940"] = await client.fields.create(newItemTypes["1214368"], {
    label: "Direzione",
    field_type: "string",
    api_key: "direction",
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "In linea", value: "row" },
          { hint: "", label: "In colonna", value: "column" },
        ],
      },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Layout" (`layout`) in block model "Gruppo KPI" (`block_kpi`)'
  );
  newFields["8143440"] = await client.fields.create(newItemTypes["1214368"], {
    label: "Layout",
    field_type: "string",
    api_key: "layout",
    hint:
      'ATTENZIONE: si consiglia di usare le impostazioni di layout solo nel template "DASHBOARD", onde evitare visualizzazioni troppo ridotte nel template "PAGE"',
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "12/12", value: "12" },
          { hint: "", label: "7/12", value: "7" },
          { hint: "", label: "6/12", value: "6" },
          { hint: "", label: "5/12", value: "5" },
        ],
      },
    },
    default_value: "12",
  });

  console.log(
    'Create Modular content field "KPI items" (`kpi_items`) in block model "Gruppo KPI" (`block_kpi`)'
  );
  newFields["6370937"] = await client.fields.create(newItemTypes["1214368"], {
    label: "KPI items",
    field_type: "rich_text",
    api_key: "kpi_items",
    validators: {
      rich_text_blocks: { item_types: [newItemTypes["1214180"].id] },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Single-line string field "Titolo" (`titolo`) in block model "Filtro" (`filter`)'
  );
  newFields["8142288"] = await client.fields.create(newItemTypes["1566104"], {
    label: "Titolo",
    field_type: "string",
    api_key: "titolo",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single link field "Grafico Associato" (`chart`) in block model "Filtro" (`filter`)'
  );
  newFields["8142289"] = await client.fields.create(newItemTypes["1566104"], {
    label: "Grafico Associato",
    field_type: "link",
    api_key: "chart",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [newItemTypes["1058312"].id],
      },
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });

  console.log(
    'Create Single link field "Chart" (`chart`) in block model "Blocco Grafico no layout" (`block_chart_base`)'
  );
  newFields["8146192"] = await client.fields.create(newItemTypes["1566742"], {
    label: "Chart",
    field_type: "link",
    api_key: "chart",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [newItemTypes["1058312"].id],
      },
      required: {},
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Blocco Grafico no layout" (`block_chart_base`)'
  );
  newFields["8146197"] = await client.fields.create(newItemTypes["1566742"], {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Subtitle" (`subtitle`) in block model "Blocco Grafico no layout" (`block_chart_base`)'
  );
  newFields["8146196"] = await client.fields.create(newItemTypes["1566742"], {
    label: "Subtitle",
    field_type: "string",
    api_key: "subtitle",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Multiple-paragraph text field "Info" (`info`) in block model "Blocco Grafico no layout" (`block_chart_base`)'
  );
  newFields["8146193"] = await client.fields.create(newItemTypes["1566742"], {
    label: "Info",
    field_type: "text",
    api_key: "info",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      type: "markdown",
    },
    default_value: "",
  });

  console.log(
    'Create Multiple-paragraph text field "Source" (`source`) in block model "Blocco Grafico no layout" (`block_chart_base`)'
  );
  newFields["8146195"] = await client.fields.create(newItemTypes["1566742"], {
    label: "Source",
    field_type: "text",
    api_key: "source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      type: "markdown",
    },
    default_value: "",
  });

  console.log(
    'Create Modular content field "KPI items" (`kpi_items`) in block model "Gruppo KPI no layout" (`block_kpi_base`)'
  );
  newFields["8730070"] = await client.fields.create(newItemTypes["1684118"], {
    label: "KPI items",
    field_type: "rich_text",
    api_key: "kpi_items",
    validators: {
      rich_text_blocks: { item_types: [newItemTypes["1214180"].id] },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda Dipartimento" (`department_subpage`)'
  );
  newFieldsets["554867"] = await client.fieldsets.create("772896", {
    title: "Intestazione",
    collapsible: true,
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  newFields["9088165"] = await client.fields.create("772896", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["554867"],
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  newFields["9088173"] = await client.fields.create("772896", {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: { id: "272024", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  newFields["9088166"] = await client.fields.create("772896", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["554867"],
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  newFields["9088174"] = await client.fields.create("772896", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "embed_dashboard",\n    "related_items",\n    "date_shown",\n    "menu_general_links",\n    "right_column_longer"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  newFields["9088167"] = await client.fields.create("772896", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["554867"],
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  newFieldsets["551126"] = await client.fieldsets.create("772913", {
    title: "Intestazione",
    collapsible: true,
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  newFields["9047620"] = await client.fields.create("772913", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["551126"],
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  newFields["9047623"] = await client.fields.create("772913", {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    hint: "Attenzione: questa \u00E8 la data che viene mostrata sul sito",
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: { id: "272017", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  newFields["9047601"] = await client.fields.create("772913", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "embed_dashboard",\n    "related_items",\n    "date_shown",\n    "menu_general_links",\n    "right_column_longer"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  newFields["9047621"] = await client.fields.create("772913", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["551126"],
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  newFields["9047622"] = await client.fields.create("772913", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["551126"],
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  newFieldsets["554870"] = await client.fieldsets.create("772924", {
    title: "Intestazione",
    hint: "",
    collapsible: true,
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  newFields["9088175"] = await client.fields.create("772924", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["554870"],
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  newFields["9088178"] = await client.fields.create("772924", {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: { id: "271975", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  newFields["9088176"] = await client.fields.create("772924", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["554870"],
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  newFields["9088179"] = await client.fields.create("772924", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "embed_dashboard",\n    "related_items",\n    "date_shown",\n    "menu_general_links",\n    "right_column_longer"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  newFields["9088177"] = await client.fields.create("772924", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["554870"],
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda Progetti" (`projects_subpage`)'
  );
  newFieldsets["555084"] = await client.fieldsets.create("772925", {
    title: "Intestazione",
  });

  console.log(
    'Create Date field "Data ultimo aggiornamento" (`last_update`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  newFields["9091578"] = await client.fields.create("772925", {
    label: "Data ultimo aggiornamento",
    field_type: "date",
    api_key: "last_update",
    appearance: { addons: [], editor: "date_picker", parameters: {} },
    fieldset: { id: "272028", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  newFields["9091574"] = await client.fields.create("772925", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["555084"],
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  newFields["9091575"] = await client.fields.create("772925", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["555084"],
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  newFields["9091581"] = await client.fields.create("772925", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "credits",\n    "embed_dashboard",\n    "related_items",\n    "date_shown"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  newFields["9091576"] = await client.fields.create("772925", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["555084"],
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda generica" (`general_page`)'
  );
  newFieldsets["555091"] = await client.fieldsets.create("772938", {
    title: "Intestazione",
    hint: "",
    collapsible: true,
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Scheda generica" (`general_page`)'
  );
  newFields["9092068"] = await client.fields.create("772938", {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: { id: "272035", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda generica" (`general_page`)'
  );
  newFields["9092001"] = await client.fields.create("772938", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["555091"],
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda generica" (`general_page`)'
  );
  newFields["9092002"] = await client.fields.create("772938", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["555091"],
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda generica" (`general_page`)'
  );
  newFields["9092069"] = await client.fields.create("772938", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "credits",\n    "embed_dashboard",\n    "related_items",\n    "date_shown"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda generica" (`general_page`)'
  );
  newFields["9092003"] = await client.fields.create("772938", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["555091"],
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda Notizie" (`news_subpage`)'
  );
  newFieldsets["555086"] = await client.fieldsets.create("772981", {
    title: "Intestazione",
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Notizie" (`news_subpage`)'
  );
  newFields["9091585"] = await client.fields.create("772981", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["555086"],
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda Notizie" (`news_subpage`)'
  );
  newFields["9091587"] = await client.fields.create("772981", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["555086"],
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Scheda Notizie" (`news_subpage`)'
  );
  newFields["9091591"] = await client.fields.create("772981", {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: { id: "272065", type: "fieldset" },
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Notizie" (`news_subpage`)'
  );
  newFields["9091588"] = await client.fields.create("772981", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["555086"],
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda Notizie" (`news_subpage`)'
  );
  newFields["9091595"] = await client.fields.create("772981", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "credits",\n    "embed_dashboard",\n    "related_items",\n    "date_shown"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create fieldset "Intestazione" in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  newFieldsets["553203"] = await client.fieldsets.create("877655", {
    title: "Intestazione",
    collapsible: true,
  });

  console.log(
    'Create DateTime field "Data ultimo aggiornamento" (`last_update`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  newFields["9072862"] = await client.fields.create("877655", {
    label: "Data ultimo aggiornamento",
    field_type: "date_time",
    api_key: "last_update",
    hint: "Attenzione: questa \u00E8 la data che viene mostrata sul sito",
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    fieldset: { id: "306109", type: "fieldset" },
  });

  console.log(
    'Create Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  newFields["9072595"] = await client.fields.create("877655", {
    label: "Titolo introduzione",
    field_type: "string",
    api_key: "introduction_title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["553203"],
  });

  console.log(
    'Create Single-line string field "Introduzione" (`introduction`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  newFields["9072596"] = await client.fields.create("877655", {
    label: "Introduzione",
    field_type: "string",
    api_key: "introduction",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
    fieldset: newFieldsets["553203"],
  });

  console.log(
    'Create Single-line string field "Template" (`template`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  newFields["9077410"] = await client.fields.create("877655", {
    label: "Template",
    field_type: "string",
    api_key: "template",
    appearance: {
      addons: [
        {
          id: newPlugins["112878"].id,
          parameters: {
            dependencies:
              '{\n  "page": [\n    "summary",\n    "image_cover",\n    "image_cover_description",\n    "content_has_index",\n    "attachments",\n    "links",\n    "credits",\n    "embed_dashboard",\n    "related_items",\n    "date_shown"\n  ],\n  "dashboard": [\n    "introduction_title",\n    "introduction",\n    "text_link_to_source",\n    "date_shown",\n    "last_update"\n  ]\n}',
          },
        },
      ],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Page", value: "page" },
          { hint: "", label: "Dashboard", value: "dashboard" },
        ],
      },
    },
    default_value: "page",
  });

  console.log(
    'Create Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  newFields["9072597"] = await client.fields.create("877655", {
    label: "Fonte dati",
    field_type: "text",
    api_key: "text_link_to_source",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: ["bold", "italic", "strikethrough", "link", "fullscreen"],
      },
      type: "markdown",
    },
    default_value: "",
    fieldset: newFieldsets["553203"],
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "_ Articolo e scheda SUPER GENERATORE (copy #1)" (`ctype_super_copy1`)'
  );
  await client.fields.update("3987463", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update("3987513", {
    position: 2,
    fieldset: newFieldsets["554867"],
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update("3987519", {
    position: 0,
    fieldset: newFieldsets["554867"],
  });

  console.log(
    'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update("3987521", {
    position: 1,
    fieldset: newFieldsets["554867"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update(newFields["9088174"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fieldsets.update(newFieldsets["554867"], { position: 5 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update(newFields["9088166"], { position: 4 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update(newFields["9088167"], { position: 5 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda Dipartimento" (`department_subpage`)'
  );
  await client.fields.update("3987511", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Homepage" (`homepage`)'
  );
  await client.fields.update("3987528", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772890",
          "772894",
          "772903",
          "772908",
          "772939",
          "772967",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Intervento" (`participation`)'
  );
  await client.fields.update("3987575", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Innova con noi" (`innovate_page`)'
  );
  await client.fields.update("3987600", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Comunicato stampa" (`press_release`)'
  );
  await client.fields.update("3987608", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update("3987646", {
    position: 0,
    fieldset: newFieldsets["551126"],
  });

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update("3987651", {
    position: 2,
    fieldset: newFieldsets["551126"],
  });

  console.log(
    'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update("3987660", {
    position: 1,
    fieldset: newFieldsets["551126"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update(newFields["9047601"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fieldsets.update(newFieldsets["551126"], { position: 5 });

  console.log(
    'Update Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update(newFields["9047620"], { position: 3 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update(newFields["9047621"], { position: 4 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update(newFields["9047622"], { position: 5 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda Italia 2026" (`italy2026_subpage`)'
  );
  await client.fields.update("3987653", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update("3987724", {
    position: 1,
    fieldset: newFieldsets["554870"],
  });

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update("3987727", {
    position: 2,
    fieldset: newFieldsets["554870"],
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update("3987730", {
    position: 0,
    fieldset: newFieldsets["554870"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update(newFields["9088179"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fieldsets.update(newFieldsets["554870"], { position: 5 });

  console.log(
    'Update Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update(newFields["9088175"], { position: 3 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update(newFields["9088176"], { position: 4 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update(newFields["9088177"], { position: 5 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda innova con noi" (`innovate_subpage`)'
  );
  await client.fields.update("3987726", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update("3987736", {
    position: 2,
    fieldset: newFieldsets["555084"],
  });

  console.log(
    'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update("3987741", {
    position: 1,
    fieldset: newFieldsets["555084"],
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update("3987747", {
    position: 0,
    fieldset: newFieldsets["555084"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update(newFields["9091581"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fieldsets.update(newFieldsets["555084"], { position: 5 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update(newFields["9091575"], { position: 4 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update(newFields["9091576"], { position: 5 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda Progetti" (`projects_subpage`)'
  );
  await client.fields.update("3987743", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Focus" (`focus_page`)'
  );
  await client.fields.update("3987790", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update("3987802", {
    position: 0,
    fieldset: newFieldsets["555091"],
  });

  console.log(
    'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update("3987809", {
    position: 1,
    fieldset: newFieldsets["555091"],
  });

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update("3987810", {
    position: 2,
    fieldset: newFieldsets["555091"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update(newFields["9092069"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda generica" (`general_page`)'
  );
  await client.fieldsets.update(newFieldsets["555091"], { position: 5 });

  console.log(
    'Update Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update(newFields["9092001"], { position: 3 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update(newFields["9092002"], { position: 4 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update(newFields["9092003"], { position: 5 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda generica" (`general_page`)'
  );
  await client.fields.update("3987803", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Articolo" (`article`)'
  );
  await client.fields.update("3987844", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Progetto" (`project`)'
  );
  await client.fields.update("3987897", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Intervista" (`interview`)'
  );
  await client.fields.update("3987973", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda Ministro" (`minister_subpage`)'
  );
  await client.fields.update("3988013", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1566742"].id,
          newItemTypes["1684118"].id,
        ],
      },
    },
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update("3988038", {
    position: 3,
    fieldset: newFieldsets["555086"],
  });

  try {
    console.log(
      'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda Notizie" (`news_subpage`)'
    );
    await client.fields.update("3988039", { fieldset: newFieldsets["555086"] });
  } catch (e) {
    console.log(e);
  }

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update("3988042", {
    position: 5,
    fieldset: newFieldsets["555086"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update(newFields["9091595"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fieldsets.update(newFieldsets["555086"], { position: 5 });

  console.log(
    'Update Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update(newFields["9091585"], { position: 0 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update(newFields["9091587"], { position: 1 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update(newFields["9091588"], { position: 2 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda Notizie" (`news_subpage`)'
  );
  await client.fields.update("3988044", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log(
    'Update Single asset field "Immagine di copertina" (`image_cover`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update("4561450", {
    position: 1,
    fieldset: newFieldsets["553203"],
  });

  console.log(
    'Update Single-line string field "Didascalia immagine di copertina" (`image_cover_description`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update("4561451", {
    position: 2,
    fieldset: newFieldsets["553203"],
  });

  console.log(
    'Update Multiple-paragraph text field "Sommario" (`summary`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update("4561456", {
    position: 0,
    fieldset: newFieldsets["553203"],
  });

  console.log(
    'Update Single-line string field "Template" (`template`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update(newFields["9077410"], { position: 4 });

  console.log(
    'Update fieldset "Intestazione" in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fieldsets.update(newFieldsets["553203"], { position: 5 });

  console.log(
    'Update Single-line string field "Titolo introduzione" (`introduction_title`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update(newFields["9072595"], { position: 3 });

  console.log(
    'Update Single-line string field "Introduzione" (`introduction`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update(newFields["9072596"], { position: 4 });

  console.log(
    'Update Multiple-paragraph text field "Fonte dati" (`text_link_to_source`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update(newFields["9072597"], { position: 5 });

  console.log(
    'Update Modular content field "Contenuti" (`content_blocks`) in model "Scheda Sottosegretario" (`undersecretary_subpage`)'
  );
  await client.fields.update("4561445", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "772881",
          "772886",
          "772897",
          "772916",
          "772923",
          "772929",
          "772930",
          "772933",
          "772951",
          "772953",
          "772960",
          "772964",
          newItemTypes["1058313"].id,
          newItemTypes["1214368"].id,
        ],
      },
    },
  });

  console.log("Finalize models/block models");

  console.log('Update model "Data visualization" (`dataviz_page`)');
  await client.itemTypes.update(newItemTypes["992885"], {
    title_field: newFields["5187710"],
  });

  console.log('Update model "Chart" (`chart`)');
  await client.itemTypes.update(newItemTypes["1058312"], {
    title_field: newFields["5549627"],
  });

  console.log('Update model "Elemento KPI " (`kpi_element`)');
  await client.itemTypes.update(newItemTypes["1214176"], {
    title_field: newFields["6370083"],
  });

  console.log("Manage menu items");

  console.log('Create menu item "Data visualization"');
  newMenuItems["505168"] = await client.menuItems.create({
    label: "Data visualization",
    item_type: newItemTypes["992885"],
    parent: { id: "404631", type: "menu_item" },
  });

  console.log('Create menu item "Chart"');
  newMenuItems["540085"] = await client.menuItems.create({
    label: "Chart",
    item_type: newItemTypes["1058312"],
  });

  console.log('Create menu item "KPI"');
  newMenuItems["619593"] = await client.menuItems.create({
    label: "KPI",
    item_type: newItemTypes["1214176"],
  });
};
