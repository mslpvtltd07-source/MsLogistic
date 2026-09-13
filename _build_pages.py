import re
from pathlib import Path

path = Path(r"c:\GitClone\PortfolioWebsite\MSLogistics")
index = (path / "index.html").read_text(encoding="utf-8")

def extract_between(html, start_marker, end_marker):
    start = html.index(start_marker)
    end = html.index(end_marker, start)
    return html[start:end]

page_shell = index[:index.index('  <main id="main">')]
after_main = index[index.index("  </main>"):]

NAV_LINKS = [
    "index.html",
    "about-us.html",
    "services.html",
    "why-choose-us.html",
    "clients.html",
    "gallery.html",
    "contact.html",
]

def make_page(title, active_link, body_class, main_content, page_overlay="", extra_scripts=""):
    page_head = re.sub(r"<title>[^<]+</title>", f"<title>{title}</title>", page_shell)
    nav_match = re.search(r'<nav class="header__nav"[\s\S]*?</nav>', page_head)
    nav = nav_match.group(0)
    nav = nav.replace('class="header__link active"', 'class="header__link"')
    nav = nav.replace(
        f'href="{active_link}" class="header__link"',
        f'href="{active_link}" class="header__link active"',
    )
    page_head = page_head.replace(nav_match.group(0), nav)
    page_head = page_head.replace("<body>", f'<body class="{body_class}">')

    foot = after_main
    scripts_match = re.search(r"<script[\s\S]*?</body>", foot)
    script_block = scripts_match.group(0)
    if extra_scripts:
        script_block = script_block.replace(
            '<script src="js/main.js" defer></script>',
            f'<script src="js/main.js" defer></script>\n  {extra_scripts}',
        )

    foot = foot.replace(scripts_match.group(0), script_block)
    return (
        page_head
        + "\n\n  "
        + main_content.strip()
        + "\n\n"
        + page_overlay
        + "\n\n"
        + foot
    )

SERVICE_MODAL = '''  <!-- Service Detail Modal -->
  <div class="modal" id="serviceModal" role="dialog" aria-modal="true" aria-label="Service details" hidden>
    <div class="modal__backdrop" id="serviceModalBackdrop"></div>
    <div class="modal__content modal__content--service">
      <button class="modal__close" id="serviceModalClose" aria-label="Close service details">&times;</button>
      <div class="modal__service" id="serviceModalBody"></div>
    </div>
  </div>'''

sections = {
    "about": extract_between(index, "    <!-- About Section -->", "    <!-- Services Section -->"),
    "services": extract_between(index, "    <!-- Services Section -->", "    <!-- Why Choose Us -->"),
    "why": extract_between(index, "    <!-- Why Choose Us -->", "    <!-- Gallery / Project Showcase -->"),
    "gallery": extract_between(index, "    <!-- Gallery / Project Showcase -->", "    <!-- Process Timeline -->"),
    "contact": extract_between(index, "    <!-- Contact Section -->", "  </main>"),
}

clients_section = '''    <!-- Client Logo Strip -->
    <section class="clients" id="clients" aria-label="Trusted by leading organizations">
      <div class="clients__track-wrapper">
        <div class="clients__track" aria-hidden="true">
          <div class="clients__logo">Embassies<span>&amp; Missions</span></div>
          <div class="clients__logo">International<span>NGOs</span></div>
          <div class="clients__logo">Corporate<span>Clients</span></div>
          <div class="clients__logo">Diplomatic<span>Missions</span></div>
          <div class="clients__logo">Individual<span>Households</span></div>
          <div class="clients__logo">Global<span>Freight</span></div>
          <div class="clients__logo">Embassies<span>&amp; Missions</span></div>
          <div class="clients__logo">International<span>NGOs</span></div>
          <div class="clients__logo">Corporate<span>Clients</span></div>
          <div class="clients__logo">Diplomatic<span>Missions</span></div>
          <div class="clients__logo">Individual<span>Households</span></div>
          <div class="clients__logo">Global<span>Freight</span></div>
          <div class="clients__logo">Embassies<span>&amp; Missions</span></div>
          <div class="clients__logo">International<span>NGOs</span></div>
          <div class="clients__logo">Corporate<span>Clients</span></div>
          <div class="clients__logo">Diplomatic<span>Missions</span></div>
        </div>
      </div>
    </section>'''

pages = [
    ("about-us.html", "About Us | MS Logistics Private Limited", "about-us.html", "page-inner", sections["about"]),
    (
        "services.html",
        "Services | MS Logistics Private Limited",
        "services.html",
        "page-inner page-services",
        sections["services"],
        SERVICE_MODAL,
        '<script src="js/services-animation.js" defer></script>',
    ),
    ("why-choose-us.html", "Why Choose Us | MS Logistics Private Limited", "why-choose-us.html", "page-inner", sections["why"]),
    ("clients.html", "Clients | MS Logistics Private Limited", "clients.html", "page-inner", clients_section),
    ("gallery.html", "Gallery | MS Logistics Private Limited", "gallery.html", "page-inner", sections["gallery"]),
    ("contact.html", "Contact | MS Logistics Private Limited", "contact.html", "page-inner", sections["contact"]),
]

for item in pages:
    file, title, active, cls, content = item[:5]
    overlay = item[5] if len(item) > 5 else ""
    extra = item[6] if len(item) > 6 else ""
    html = make_page(title, active, cls, f'  <main id="main">\n{content}\n  </main>', overlay, extra)
    (path / file).write_text(html, encoding="utf-8")
    print(f"Wrote {file}")

# Trim index.html
updated = index
updated = re.sub(
    r"    <!-- About Section -->.*?    <!-- Process Timeline -->",
    "    <!-- Process Timeline -->",
    updated,
    flags=re.S,
)
updated = re.sub(
    r"    <!-- Contact Section -->.*?(?=  </main>)",
    "",
    updated,
    flags=re.S,
)
updated = re.sub(
    r"  <!-- Project Detail Modal -->.*?(?=  <!-- Custom Cursor -->)",
    "",
    updated,
    flags=re.S,
)
(path / "index.html").write_text(updated, encoding="utf-8")
print("Updated index.html")
