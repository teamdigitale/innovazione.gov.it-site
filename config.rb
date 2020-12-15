require "dotenv"

require "lib/path_helpers"
require "lib/image_helpers"

Dotenv.load

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

set :url_root, ENV.fetch("BASE_URL")

ignore "/templates/*"

LOCALES = ["it"]
activate :i18n, langs: LOCALES, mount_at_root: LOCALES[0].intern

activate :asset_hash
activate :directory_indexes
activate :pagination
activate :inline_svg

activate :dato, token: ENV.fetch("DATO_API_TOKEN"), live_reload: true

webpack_command =
  if build?
    "yarn run build"
  else
    "yarn run dev"
  end

activate :external_pipeline,
  name: :webpack,
  command: webpack_command,
  source: ".tmp/dist",
  latency: 1

configure :build do
  activate :minify_html do |html|
    html.remove_input_attributes = false
  end
  activate :search_engine_sitemap,
    default_priority: 0.5,
    default_change_frequency: "weekly"
end

configure :development do
  activate :livereload
end

helpers do
  include PathHelpers
  include ImageHelpers

  # Custom helper to theme
  def site_nav_menu
    [
      # dato.about_page,
      # dato.contact_page
    ]
  end
end

LOCALES.each do |locale|
  I18n.with_locale(locale) do
    proxy "/index.html",
      "/localizable/index.html",
      locale: locale

    proxy "/contact/index.html",
      "templates/contact_page.html",
      locals: { locale: I18n.locale },
      locale: locale
  end
end

proxy "site.webmanifest",
  "templates/site.webmanifest",
  :layout => false

proxy "browserconfig.xml",
  "templates/browserconfig.xml",
  :layout => false

proxy "/_redirects",
  "/templates/redirects.txt",
  :layout => false
