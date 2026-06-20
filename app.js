(() => {
  "use strict";

  const STORAGE_KEYS = {
    stats: "aricInnovationStats",
    vault: "aricQuestionVault"
  };

  const CATEGORIES = [
    "Everyday Objects",
    "Technology",
    "Transportation",
    "Medicine",
    "Scientific Discoveries",
    "Internet",
    "Agriculture",
    "Social Innovations",
    "Research Methods",
    "Weird Inventions"
  ];

  const CATEGORY_META = {
    "Everyday Objects": { code: "EVERYDAY", a: "#4de7ff", b: "#ffd166" },
    Technology: { code: "TECH", a: "#62f5a7", b: "#4de7ff" },
    Transportation: { code: "MOTION", a: "#ff4fc3", b: "#ffd166" },
    Medicine: { code: "MED", a: "#62f5a7", b: "#ff5d73" },
    "Scientific Discoveries": { code: "SCIENCE", a: "#ffd166", b: "#4de7ff" },
    Internet: { code: "NETWORK", a: "#4de7ff", b: "#ff4fc3" },
    Agriculture: { code: "GROWTH", a: "#62f5a7", b: "#ffd166" },
    "Social Innovations": { code: "SOCIETY", a: "#ff4fc3", b: "#62f5a7" },
    "Research Methods": { code: "METHOD", a: "#ffd166", b: "#ff5d73" },
    "Weird Inventions": { code: "ODD", a: "#ff5d73", b: "#4de7ff" }
  };

  function hashString(value) {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(index);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  const CATEGORY_EMOJI = {
    "Everyday Objects": "🧩",
    Technology: "⚡",
    Transportation: "🚦",
    Medicine: "🩺",
    "Scientific Discoveries": "🔬",
    Internet: "🌐",
    Agriculture: "🌱",
    "Social Innovations": "🤝",
    "Research Methods": "🧪",
    "Weird Inventions": "🌀"
  };

  const EMOJI_RULES = [
    [/Safety Pin/i, "🧷"], [/Paper Clip/i, "📎"], [/Pen|Post-it|Notebook/i, "📝"],
    [/Umbrella/i, "☂️"], [/Match|Fire/i, "🔥"], [/Toothbrush/i, "🪥"],
    [/Refrigerator|Microwave|Washing|Toaster|Coffee/i, "🍽️"], [/Bandage/i, "🩹"],
    [/Barcode|QR|RFID/i, "▦"], [/Transistor|Circuit|Microprocessor|USB/i, "💠"],
    [/Battery|Solar|LED/i, "🔋"], [/Touchscreen|Sensor|Camera|Image/i, "📱"],
    [/GPS|Maps/i, "📍"], [/Printer/i, "🧱"], [/Fiber|Wi-Fi|Cloud|Internet/i, "📡"],
    [/Drone/i, "🛸"], [/Watch/i, "⌚"], [/Wheel|Bicycle/i, "🚲"],
    [/Locomotive|Train|Subway|Maglev/i, "🚆"], [/Airplane|Jet/i, "✈️"],
    [/Car|Seat Belt|Traffic|Ride-sharing|Segway/i, "🚗"], [/Container|Amphicar/i, "🚢"],
    [/Bridge/i, "🌉"], [/Vaccine|Insulin/i, "💉"], [/X-ray|MRI|CT|Fluoroscope/i, "🩻"],
    [/Penicillin|Antibiotic|Contraceptive/i, "💊"], [/Anesthesia|Sleep/i, "😴"],
    [/Pacemaker|Heart/i, "❤️"], [/Rehydration|Irrigation|Water/i, "💧"],
    [/Handwashing/i, "🧼"], [/Blood/i, "🩸"], [/Prosthetic/i, "🦾"],
    [/CRISPR|DNA|Gene/i, "🧬"], [/Gravity|Earth|Heliocentric|Plate/i, "🌍"],
    [/Germ|Microbe|Bacteria/i, "🦠"], [/Periodic|Chemical|Quantum|Energy/i, "⚛️"],
    [/Radioactivity|Cosmic|Greenhouse|Photosynthesis/i, "☀️"], [/Email/i, "✉️"],
    [/Web|Hyperlink|DNS|Search/i, "🔗"], [/Wikipedia|Library/i, "📚"],
    [/Streaming|Social/i, "▶️"], [/Authentication|Cyber|Security/i, "🔐"],
    [/Seed|Crop|Wheat|Farm|Agriculture/i, "🌾"], [/Tractor|Harvester/i, "🚜"],
    [/Fertilizer|Soil/i, "🧪"], [/Greenhouse/i, "🏡"], [/Weather/i, "🌦️"],
    [/Microfinance|Credit|Crowdfunding|Money|Budget/i, "💸"], [/Cooperative|Participatory|Community/i, "🤝"],
    [/Kindergarten|Education|School/i, "🎒"], [/Health|Donation|Disaster/i, "🚨"],
    [/Radio/i, "📻"], [/Trial|Randomized|A\/B|Control/i, "🎲"], [/Survey|Review|Checklist/i, "📋"],
    [/Study|Ethnography|Experiment|Method/i, "🧭"], [/Pet Rock|Monowheel|Smell|CueCat|Automaton/i, "🌀"],
    [/Furniture/i, "🪑"], [/Chess/i, "♟️"]
  ];

  function emojiForCard(card) {
    const rule = EMOJI_RULES.find(([pattern]) => pattern.test(card.name));
    return rule ? rule[1] : CATEGORY_EMOJI[card.category] || "💡";
  }

  const CARD_SEEDS = {
    "Everyday Objects": [
      ["Safety Pin", "To fasten fabric quickly while shielding the sharp point.", "Walter Hunt patented the design in 1849 while looking for a practical clasp.", "It folded a spring, clasp, and guard into one tiny reusable mechanism.", "It made clothing repair, bandages, diapers, and emergency fixes easier for everyday life."],
      ["Paper Clip", "To keep sheets together without glue, string, or holes.", "Offices exploded with loose paper during the late industrial age.", "A small bent wire used spring tension instead of a separate fastener.", "It became a quiet symbol of organized information and low-cost office design."],
      ["Zipper", "To close clothing and bags faster than buttons or laces.", "Early fasteners were clumsy until improved interlocking teeth made them reliable.", "It converted many small closures into one smooth sliding action.", "It reshaped fashion, luggage, uniforms, and waterproof gear."],
      ["Ballpoint Pen", "To write cleanly without fountain-pen leaks and constant refilling.", "Laszlo Biro noticed newspaper ink dried quickly and paired it with a rolling ball.", "It controlled ink flow with a tiny rotating sphere.", "It made cheap, portable, reliable writing available almost everywhere."],
      ["Post-it Note", "To leave temporary reminders without damaging surfaces.", "A weak adhesive from 3M became useful when paired with paper bookmarks.", "It turned a failed strong glue into a reusable low-tack communication tool.", "It changed brainstorming, studying, office workflows, and quick visual planning."],
      ["Hook-and-loop Fastener", "To close items repeatedly without knots, buttons, or zippers.", "George de Mestral studied burrs stuck to clothing after a walk.", "It copied nature by pairing tiny hooks with looped fibers.", "It helped shoes, medical gear, space suits, cable management, and adaptive clothing."],
      ["Modern Toothbrush", "To clean teeth more effectively than cloth, twigs, or powders.", "Mass-produced bristled brushes became practical as materials and hygiene awareness improved.", "A small handle and dense bristles made personal dental care repeatable.", "It helped normalize daily oral hygiene and reduce preventable dental disease."],
      ["Folding Umbrella", "To carry rain protection without a long walking stick.", "Compact city life created demand for portable weather tools.", "Telescoping ribs collapsed a large canopy into a small object.", "It made weather readiness part of everyday commuting."],
      ["Friction Match", "To start fire quickly without flint, steel, or embers.", "Nineteenth-century chemistry turned ignition into a pocket technology.", "A reactive tip created flame from a controlled scrape.", "It transformed cooking, lighting, camping, industry, and emergency preparedness."],
      ["Tin Can", "To preserve food safely for long travel and storage.", "Military and naval needs drove early experiments in sealed food containers.", "Heat sterilization plus airtight metal packaging slowed spoilage dramatically.", "It changed food distribution, disaster relief, exploration, and grocery shelves."],
      ["Domestic Refrigerator", "To keep food fresh without ice delivery or cool cellars.", "Electricity and vapor-compression systems entered homes in the twentieth century.", "It moved heat out of an insulated cabinet on demand.", "It reduced food waste, changed diets, and altered how families shop and cook."],
      ["Electric Washing Machine", "To reduce the hard labor and time of washing clothes by hand.", "Urban households needed sanitation without all-day manual laundry.", "A motorized drum automated agitation, rinsing, and later spinning.", "It freed huge amounts of household labor and improved cleanliness."],
      ["Microwave Oven", "To heat food quickly without heating an entire stove or oven.", "Percy Spencer noticed radar equipment melted a candy bar in his pocket.", "It used electromagnetic waves to excite water molecules inside food.", "It changed workplace meals, dorm life, leftovers, and convenience cooking."],
      ["Adhesive Bandage", "To cover small wounds without needing a separate cloth and tape.", "Earle Dickson created ready-made dressings for frequent kitchen injuries.", "It combined sterile gauze and adhesive backing in a portable strip.", "It made first aid faster, cleaner, and accessible to non-experts."],
      ["Barcode", "To identify products quickly without typing every price by hand.", "Supermarkets needed speed and accuracy as product variety grew.", "Printed patterns turned objects into machine-readable data.", "It enabled faster checkout, inventory tracking, logistics, and modern retail analytics."]
    ],
    Technology: [
      ["Transistor", "To amplify and switch signals without bulky, fragile vacuum tubes.", "Bell Labs researchers introduced it in 1947 during a communications revolution.", "It used semiconductor physics to make electronics smaller and more reliable.", "It became the foundation of computers, radios, phones, and digital society."],
      ["Integrated Circuit", "To connect many electronic parts without hand-wiring each one.", "The space race and computing needs demanded smaller, lighter circuits.", "It placed multiple components onto one tiny chip.", "It unlocked modern computing, satellites, calculators, phones, and embedded devices."],
      ["LED", "To produce light efficiently from a solid-state component.", "Early LEDs were dim indicators before materials improved across colors.", "It converted electricity directly into photons with little heat waste.", "It changed displays, lighting, signage, sensors, and energy use."],
      ["Lithium-ion Battery", "To store more energy in lighter rechargeable devices.", "Portable electronics needed batteries that did not feel like bricks.", "It moved lithium ions between electrodes for high energy density.", "It powered laptops, phones, electric vehicles, drones, and grid storage."],
      ["Capacitive Touchscreen", "To make devices respond directly to fingers instead of keyboards or styluses.", "Mobile computing needed a compact interface for visual software.", "It sensed tiny electrical changes from touch through glass.", "It reshaped phones, kiosks, tablets, maps, payments, and public displays."],
      ["GPS Receiver", "To determine location anywhere without landmarks or local guides.", "A military satellite network became a public navigation utility.", "It compared timing signals from satellites to calculate position.", "It changed transport, farming, mapping, disaster response, fitness, and dating apps."],
      ["3D Printer", "To make prototypes and custom objects without molds or machining.", "Designers needed faster paths from digital model to physical test.", "It built objects layer by layer from digital instructions.", "It accelerated prototyping, medical models, education, and small-batch manufacturing."],
      ["Digital Image Sensor", "To capture photographs without film chemistry.", "CCD and CMOS sensors matured as electronics became cheaper and smaller.", "It converted light into digital signals pixel by pixel.", "It put cameras into phones, science instruments, traffic systems, and telescopes."],
      ["USB Connector", "To simplify the mess of incompatible computer ports.", "Personal computers once required different cables for each peripheral.", "It unified power, data, and plug-and-play discovery in one standard.", "It made accessories easier and helped create a universal peripheral ecosystem."],
      ["Solar Cell", "To generate electricity from sunlight where fuel or wires were difficult.", "Space programs needed long-lasting power for satellites.", "Photovoltaic materials converted photons directly into electric current.", "It expanded renewable power, remote sensors, calculators, homes, and microgrids."],
      ["Microprocessor", "To put a programmable computer processor on one chip.", "Calculators and embedded control systems needed compact computing.", "It compressed a central processing unit into silicon.", "It made personal computers, appliances, cars, and smart devices possible."],
      ["Fiber Optic Cable", "To transmit huge amounts of information over long distances.", "Copper cables could not keep up with global communication demand.", "It carried data as light through ultra-clear glass fibers.", "It formed the backbone of broadband, undersea cables, and global networks."],
      ["RFID Tag", "To identify objects wirelessly without line-of-sight scanning.", "Supply chains needed faster tracking than manual labels.", "Tiny chips used radio signals to report stored identifiers.", "It improved logistics, access cards, libraries, tolls, and inventory systems."],
      ["Quadcopter Drone", "To create stable, agile flight without a runway or pilot onboard.", "Small sensors and control software made multi-rotor balance practical.", "It adjusted four rotors many times per second for controlled motion.", "It changed filming, inspection, mapping, farming, rescue, and hobby robotics."],
      ["Smartwatch", "To bring sensors, notifications, and health cues onto the wrist.", "Wearable computing grew as chips became powerful and low energy.", "It merged a watch with biometrics, wireless links, and compact apps.", "It popularized step tracking, quick alerts, contactless payments, and personal health trends."]
    ],
    Transportation: [
      ["Wheel", "To move heavy loads with less friction than dragging.", "Ancient societies paired wheels with axles after mastering tools and materials.", "It turned sliding friction into rolling motion.", "It transformed transport, pottery, machinery, agriculture, and industrial systems."],
      ["Steam Locomotive", "To move people and goods faster than animal power.", "Industrial Britain needed reliable transport for coal, factories, and cities.", "It converted steam pressure into mechanical motion on rails.", "It compressed distance, accelerated trade, and changed settlement patterns."],
      ["Safety Bicycle", "To make cycling stable and practical for ordinary riders.", "High-wheel bicycles were dangerous and hard to mount.", "Equal-sized wheels, chain drive, and pneumatic tires improved control.", "It expanded personal mobility and influenced roads, sports, and social freedom."],
      ["Moving Assembly Line", "To build vehicles faster and cheaper at scale.", "Henry Ford adapted continuous-flow ideas to automobile production.", "It brought work to workers in repeatable timed steps.", "It lowered car prices and became a model for mass manufacturing."],
      ["Powered Airplane", "To achieve controlled heavier-than-air flight.", "Experimenters had gliders but needed lift, control, and propulsion together.", "The Wright brothers combined wings, engine, propellers, and three-axis control.", "It created aviation, changed war, tourism, commerce, and emergency response."],
      ["Shipping Container", "To move cargo between ships, trucks, and trains without repacking.", "Ports once lost time to manual loading of loose goods.", "Standardized boxes made global freight modular.", "It lowered shipping costs and helped create modern global supply chains."],
      ["Electric Traffic Signal", "To coordinate busy intersections safely.", "Growing car traffic made hand signals and police control inefficient.", "Colored lights gave clear, repeatable instructions to drivers and pedestrians.", "It reduced confusion and became essential urban infrastructure."],
      ["Three-point Seat Belt", "To protect passengers during sudden crashes.", "Early belts restrained poorly and could injure occupants.", "Nils Bohlin's design spread forces across the chest and pelvis.", "It saved millions of lives and set a standard for safety engineering."],
      ["Electric Car", "To move people with less tailpipe pollution and fewer mechanical parts.", "Battery advances and climate concerns revived electric vehicle development.", "Electric motors delivered efficient torque with software-managed batteries.", "It shifted debates about energy, cities, mining, grids, and transport policy."],
      ["Maglev Train", "To reduce friction and reach very high rail speeds.", "Engineers looked beyond wheel-on-rail limits for intercity travel.", "Magnetic levitation lifted and propelled the train without contact.", "It demonstrated new possibilities for fast, smooth, electric transport."],
      ["Underground Subway", "To move large crowds through cities without surface congestion.", "Dense nineteenth-century cities needed mass transit below crowded streets.", "Rail tunnels separated passenger flow from road traffic.", "It reshaped commuting, real estate, city growth, and public life."],
      ["Jet Engine", "To fly faster and higher than propeller aircraft.", "World War II and aerodynamics pushed aviation toward gas turbines.", "It produced thrust by compressing, burning, and expelling air.", "It made global air travel routine and changed military and commercial aviation."],
      ["Cargo Bicycle", "To move goods through crowded streets without trucks.", "Urban delivery and family transport needed low-cost local mobility.", "Extended frames and load platforms carried weight while staying nimble.", "It supports cleaner last-mile logistics and human-scale city transport."],
      ["Ride-sharing App", "To match riders and drivers quickly using location data.", "Smartphones made real-time maps, payments, and ratings widely available.", "It coordinated supply and demand through software rather than street hailing.", "It changed urban mobility, gig work, regulation, and expectations for convenience."],
      ["Suspension Bridge", "To cross long spans where piers were difficult or impossible.", "Rivers and harbors limited trade and city growth.", "Cables carried tension across towers to support long decks.", "It connected regions, enabled landmark infrastructure, and advanced structural engineering."]
    ],
    Medicine: [
      ["Smallpox Vaccine", "To prevent a deadly contagious disease before infection.", "Edward Jenner built on observations that cowpox exposure protected milkmaids.", "It trained immunity using a safer related virus.", "It led to smallpox eradication and launched modern vaccination strategies."],
      ["Stethoscope", "To listen to internal body sounds without direct ear contact.", "Rene Laennec created it in 1816 to improve diagnosis and privacy.", "A simple tube amplified chest sounds into clinical evidence.", "It became an icon of medical examination and bedside diagnosis."],
      ["X-ray Imaging", "To see bones and hidden objects without surgery.", "Wilhelm Roentgen discovered penetrating radiation in 1895.", "It used invisible rays and photographic plates to reveal internal structures.", "It transformed trauma care, dentistry, security, and noninvasive inspection."],
      ["Penicillin Antibiotic", "To kill bacterial infections that often became fatal.", "Alexander Fleming noticed mold inhibiting bacteria in 1928.", "It exploited a natural compound that attacked bacterial cell walls.", "It made surgery safer and turned many infections from deadly to treatable."],
      ["Insulin Therapy", "To manage diabetes when the body cannot regulate blood sugar.", "Before insulin, type 1 diabetes was usually fatal.", "Extracted and later engineered insulin replaced a missing hormone.", "It turned diabetes into a manageable chronic condition for millions."],
      ["Surgical Anesthesia", "To perform operations without unbearable pain and shock.", "Ether demonstrations in the 1840s changed surgical practice.", "It temporarily blocked consciousness or sensation during procedures.", "It enabled longer, safer, more complex surgery."],
      ["MRI Scanner", "To image soft tissues without ionizing radiation.", "Researchers applied nuclear magnetic resonance to medical imaging.", "It used magnetic fields and radio waves to map body structures.", "It transformed brain, joint, tumor, and spinal diagnosis."],
      ["Implantable Pacemaker", "To correct dangerous heart rhythm problems.", "Early external devices were bulky until electronics became miniaturized.", "It delivered timed electrical pulses inside the body.", "It gave patients with rhythm disorders longer and more active lives."],
      ["Oral Contraceptive Pill", "To give people reliable control over pregnancy timing.", "Hormone research and reproductive rights movements converged in the twentieth century.", "It used synthetic hormones to prevent ovulation.", "It affected family planning, education, careers, health, and social policy."],
      ["Oral Rehydration Therapy", "To treat dehydration from diarrheal disease cheaply.", "Public health researchers needed a simple treatment usable far from hospitals.", "A precise salt-sugar solution helps the intestine absorb water.", "It has saved millions of lives, especially children."],
      ["Handwashing Protocol", "To reduce infections spread by caregivers and surfaces.", "Ignaz Semmelweis linked hand cleaning to lower maternity deaths.", "It treated cleanliness as a measurable medical intervention.", "It became a foundation of infection control in hospitals and public life."],
      ["Blood Typing", "To make transfusions safer by matching compatible blood.", "Early transfusions failed unpredictably before blood groups were discovered.", "Karl Landsteiner identified immune reactions between blood types.", "It made surgery, trauma care, childbirth care, and blood banks safer."],
      ["CT Scanner", "To create cross-sectional images of the body.", "Computing made it possible to reconstruct many X-ray measurements.", "It combined rotating X-rays with mathematical reconstruction.", "It improved emergency diagnosis, cancer detection, and surgical planning."],
      ["Modern Prosthetic Limb", "To restore mobility or function after limb loss.", "War injuries and rehabilitation needs pushed prosthetic design forward.", "Light materials, sockets, sensors, and microprocessors improved fit and control.", "It helped people return to work, sport, independence, and self-expression."],
      ["CRISPR-Cas9 Gene Editing", "To edit DNA more precisely and cheaply than older methods.", "Researchers adapted a bacterial immune system into a programmable tool.", "Guide RNA directs Cas9 to a chosen genetic sequence.", "It accelerated biology research and opened major debates about medicine and ethics."]
    ],
    "Scientific Discoveries": [
      ["Gravity", "To explain why objects fall and planets move predictably.", "Newton connected falling objects with celestial motion in the seventeenth century.", "One mathematical law linked Earth and the heavens.", "It powered navigation, engineering, astronomy, and later spaceflight."],
      ["Germ Theory", "To explain disease transmission beyond bad air or imbalance.", "Pasteur, Koch, and others connected microbes to infection.", "It made invisible organisms testable causes of disease.", "It changed sanitation, surgery, food safety, vaccines, and public health."],
      ["DNA Double Helix", "To explain how genetic information is stored and copied.", "X-ray crystallography and biochemical evidence converged in the 1950s.", "The structure revealed complementary base pairing.", "It launched modern genetics, biotechnology, forensics, and genomic medicine."],
      ["Natural Selection", "To explain how species adapt and diversify over time.", "Darwin and Wallace synthesized observations from nature, breeding, and geology.", "It showed that inherited variation plus survival pressure can shape populations.", "It became a central framework for biology, medicine, and ecology."],
      ["Plate Tectonics", "To explain earthquakes, volcanoes, mountains, and drifting continents.", "Seafloor mapping and magnetic stripes strengthened continental drift evidence.", "It described Earth's crust as moving plates.", "It unified geology and improved hazard understanding."],
      ["Periodic Table", "To organize elements and predict missing ones.", "Chemists faced a growing list of substances with repeating properties.", "Mendeleev arranged elements by patterns and left predictive gaps.", "It became a map for chemistry, materials science, and education."],
      ["Electromagnetic Induction", "To explain how motion and magnetism can produce electricity.", "Michael Faraday's experiments connected changing magnetic fields with current.", "It revealed a practical bridge between mechanical energy and electrical energy.", "It underlies generators, transformers, motors, and the electric grid."],
      ["Quantum Theory", "To explain atomic behavior that classical physics could not.", "Blackbody radiation, spectra, and photoelectric experiments broke old assumptions.", "It treated energy and matter as quantized and probabilistic.", "It enabled semiconductors, lasers, MRI, and modern chemistry."],
      ["Radioactivity", "To explain energy emitted from certain atoms.", "Becquerel and the Curies studied mysterious emissions from uranium compounds.", "It revealed unstable nuclei and new forms of radiation.", "It transformed medicine, dating methods, energy, and nuclear ethics."],
      ["Photosynthesis", "To explain how plants turn light into chemical energy.", "Centuries of experiments traced the roles of light, carbon dioxide, and chlorophyll.", "It linked solar energy to sugar production and oxygen release.", "It grounds agriculture, ecology, climate science, and food webs."],
      ["Cosmic Microwave Background", "To test whether the universe began hot and dense.", "Penzias and Wilson detected faint microwave radiation in 1965.", "It provided leftover light from the early universe.", "It became key evidence for Big Bang cosmology."],
      ["Greenhouse Effect", "To explain how atmospheric gases warm a planet.", "Fourier, Tyndall, and Arrhenius studied heat trapping by gases.", "It identified radiation balance as a climate driver.", "It underpins climate science, policy debates, and energy research."],
      ["Heliocentric Model", "To explain planetary motion more simply than Earth-centered models.", "Copernicus proposed a Sun-centered system during the Renaissance.", "It reframed Earth as a moving planet rather than the cosmic center.", "It changed astronomy, philosophy, navigation, and scientific authority."],
      ["Conservation of Energy", "To explain why energy changes form but is not destroyed.", "Nineteenth-century physics connected heat, motion, work, and electricity.", "It unified many processes through a single accounting principle.", "It guides engineering, ecology, chemistry, and every energy technology."],
      ["Chemical Synapse", "To explain how nerve cells communicate across tiny gaps.", "Experiments showed signals could be chemical, not only electrical.", "Neurotransmitters became measurable messengers between cells.", "It transformed neuroscience, psychiatry, drugs, and learning research."]
    ],
    Internet: [
      ["Packet Switching", "To send data efficiently across unreliable networks.", "Researchers needed resilient communication that did not reserve an entire circuit.", "Messages were split into packets routed independently.", "It made flexible, scalable digital networks possible."],
      ["Email", "To send messages between computer users asynchronously.", "Networked research labs needed quick written communication across machines.", "It separated message creation from immediate delivery.", "It reshaped work, universities, personal communication, and digital identity."],
      ["World Wide Web", "To browse linked information across the internet easily.", "Tim Berners-Lee wanted a shared information system for researchers.", "URLs, HTTP, and HTML made documents linkable and retrievable.", "It turned the internet into a public knowledge and commerce platform."],
      ["Search Engine", "To find relevant pages in a rapidly growing web.", "Directories became inadequate as websites multiplied.", "Crawlers and ranking algorithms indexed pages at scale.", "It changed research, advertising, memory, news, and everyday problem solving."],
      ["Wikipedia", "To build a free encyclopedia that anyone could improve.", "The web made large-scale collaborative editing possible.", "Open editing and revision history turned readers into contributors.", "It became one of the world's most used reference resources."],
      ["Wi-Fi", "To connect devices wirelessly to local networks.", "Laptop mobility and home networking needed cable-free access.", "Radio standards moved data through shared spectrum.", "It made cafes, campuses, homes, phones, and smart devices continuously connected."],
      ["TCP/IP", "To let different networks communicate as one internet.", "Separate networks needed a common language for data exchange.", "Layered protocols handled addressing, transport, and routing.", "It enabled the global internet to grow across hardware and organizations."],
      ["Domain Name System", "To replace hard-to-remember numeric addresses with names.", "As networks expanded, manually maintained host lists became impossible.", "DNS distributed name lookup across a hierarchy of servers.", "It made the internet human-readable and scalable."],
      ["Hyperlink", "To connect one document or idea directly to another.", "Early hypertext visions imagined nonlinear trails through knowledge.", "Clickable references turned reading into navigation.", "It shaped web browsing, learning, citation, and digital storytelling."],
      ["Streaming Video", "To watch media without downloading the whole file first.", "Broadband and compression made continuous playback practical.", "Data arrives in chunks and adapts to network conditions.", "It transformed entertainment, education, sports, news, and creator culture."],
      ["Social Network Feed", "To organize updates from many people in one place.", "Online communities needed a simple way to keep up with activity.", "The feed ranked and sequenced posts into a continuous stream.", "It changed friendship, politics, marketing, identity, and attention."],
      ["Open-source Repository", "To coordinate software work across many contributors.", "Distributed teams needed version history, review, and collaboration tools.", "Repositories made code changes trackable, forkable, and discussable.", "They accelerated software ecosystems and research reproducibility."],
      ["Online Maps", "To navigate and search places without paper maps.", "GPS, satellite imagery, and web data converged on consumer devices.", "Interactive maps combined location, routing, search, and live updates.", "They changed travel, delivery, urban planning, and local discovery."],
      ["Two-factor Authentication", "To protect accounts when passwords are stolen.", "Password reuse and phishing made single-factor login fragile.", "It requires a second proof such as a code, key, or device.", "It improved security for banking, email, work, and personal accounts."],
      ["Cloud Computing", "To rent computing power without owning the hardware.", "Web companies needed flexible infrastructure that could scale quickly.", "Virtualized resources became available on demand over networks.", "It reshaped startups, research computing, media, AI, and enterprise software."]
    ],
    Agriculture: [
      ["Seed Drill", "To plant seeds evenly instead of scattering them by hand.", "Jethro Tull's eighteenth-century design addressed wasteful broadcast sowing.", "It placed seeds at controlled depth and spacing.", "It improved yields and helped mechanize agriculture."],
      ["Crop Rotation", "To restore soil fertility and reduce pests without exhausting fields.", "Farmers learned that repeating the same crop damaged productivity.", "Alternating crops balanced nutrients and disrupted pest cycles.", "It supported more reliable food production and sustainable land use."],
      ["Tractor", "To replace animal power for heavy farm work.", "Combustion engines made mobile mechanical power practical on fields.", "It pulled implements with greater strength and consistency.", "It increased farm scale, productivity, and rural labor changes."],
      ["Irrigation Canal", "To bring water to crops when rainfall was unreliable.", "Ancient river civilizations engineered channels for predictable harvests.", "Gravity-fed waterways redirected and stored seasonal water.", "They enabled cities, surplus food, and complex societies."],
      ["Drip Irrigation", "To water plants efficiently in dry regions.", "Israeli engineers refined slow, targeted water delivery for agriculture.", "Small emitters deliver water near roots with low evaporation.", "It saves water and supports farming in arid climates."],
      ["Dwarf Wheat", "To grow high-yield wheat that resisted lodging.", "Green Revolution breeders responded to hunger and population growth.", "Shorter stems supported heavier grain heads with fertilizer.", "It increased harvests and changed global food security debates."],
      ["Haber-Bosch Fertilizer", "To produce nitrogen fertilizer at industrial scale.", "Natural nitrate supplies could not meet agricultural and industrial demand.", "It fixed atmospheric nitrogen into ammonia using heat, pressure, and catalysts.", "It fed billions while raising energy and environmental challenges."],
      ["Combine Harvester", "To reap, thresh, and clean grain in one machine.", "Large farms needed faster harvests with fewer labor bottlenecks.", "It combined multiple harvest steps into a moving system.", "It transformed grain farming and seasonal labor patterns."],
      ["Glass Greenhouse", "To grow plants outside normal seasons and climates.", "Glass and heating let growers control light, warmth, and humidity.", "It created a protected microclimate for crops.", "It expanded horticulture, research, seedling production, and urban farming."],
      ["Soil Testing Kit", "To know what nutrients or pH a field actually needs.", "Modern agronomy emphasized measurement over guesswork.", "Chemical tests translated soil samples into management decisions.", "It reduced waste and improved crop health."],
      ["Farm Weather Forecasting", "To plan planting, irrigation, and harvest around weather risk.", "Meteorology and communication networks brought forecasts to growers.", "It turned atmospheric data into practical farm decisions.", "It helps reduce crop loss and improve resource timing."],
      ["Terrace Farming", "To grow crops on steep slopes without losing soil.", "Mountain communities engineered stepped fields over generations.", "Terraces slow runoff and create flat planting surfaces.", "They protect soil, conserve water, and support dense settlement."],
      ["Aquaponics", "To grow fish and plants in a linked recycling system.", "Researchers and growers combined aquaculture with hydroponics.", "Fish waste feeds plants, and plants help clean water.", "It explores compact food production with circular resource flows."],
      ["Precision Agriculture", "To treat fields according to local conditions instead of averages.", "GPS, sensors, drones, and data analytics entered farm management.", "It maps variability and applies inputs only where needed.", "It can reduce waste, improve yields, and create new data skills for farmers."],
      ["Seed Bank", "To preserve genetic diversity for future breeding and resilience.", "Crop varieties can vanish through disease, war, climate, or market pressure.", "Seeds are stored under controlled conditions for long-term survival.", "They protect food security and biodiversity for future research."]
    ],
    "Social Innovations": [
      ["Public Library", "To make knowledge available beyond wealthy private collections.", "Cities and reformers built shared institutions for learning.", "It treated access to books and information as a public good.", "It supported education, citizenship, job searches, and community life."],
      ["Microfinance", "To provide small loans to people excluded from traditional banks.", "Development workers saw that tiny amounts of capital could unlock local enterprise.", "Group lending and local trust reduced barriers to credit.", "It expanded financial access while sparking debates about debt and impact."],
      ["Cooperative Movement", "To let members jointly own and govern economic resources.", "Workers and consumers organized alternatives to exploitative markets.", "One-member-one-vote structures shared risk and benefit.", "Cooperatives shaped farming, retail, banking, housing, and worker ownership."],
      ["Kindergarten", "To support early childhood learning through play and social development.", "Friedrich Froebel argued young children needed a designed learning environment.", "It treated play as a serious educational method.", "It changed early education and expectations about childhood."],
      ["Universal Basic Education", "To make literacy and numeracy broadly available.", "Industrial and democratic societies needed educated citizens and workers.", "Public schooling systems scaled instruction beyond elites.", "It transformed opportunity, public health, economies, and civic participation."],
      ["Public Health Campaign", "To change behavior at population scale before illness spreads.", "Governments and communities needed tools beyond individual treatment.", "Clear messages, trusted channels, and repeated cues shaped habits.", "Campaigns affected vaccination, sanitation, road safety, smoking, and nutrition."],
      ["Credit Union", "To offer member-owned financial services.", "Communities created alternatives to predatory lending and distant banks.", "Depositors became owners who shared governance and benefits.", "Credit unions expanded savings, loans, and local financial resilience."],
      ["Blood Donation Network", "To connect voluntary donors with patients who need blood.", "Surgery, trauma, and childbirth required reliable blood supplies.", "Screening, typing, storage, and logistics turned generosity into infrastructure.", "It saves lives daily and strengthens community health systems."],
      ["Open-source License", "To let people use, study, modify, and share software legally.", "Programmers needed rules that protected collaboration.", "Licenses converted informal sharing into enforceable permissions.", "They powered internet infrastructure, research tools, and collaborative innovation."],
      ["Participatory Budgeting", "To let residents decide how public money is spent.", "Cities experimented with deeper democracy beyond elections.", "Communities propose, debate, and vote on projects.", "It can increase trust, transparency, and civic learning."],
      ["Time Bank", "To exchange services using hours instead of money.", "Communities wanted to value care work and mutual aid.", "One hour of help earns one hour of credit.", "It strengthens local networks and recognizes skills outside formal markets."],
      ["Community Radio", "To give local voices access to mass communication.", "Remote and marginalized communities needed media in their own languages.", "Low-cost broadcasting created local information channels.", "It supports disaster alerts, culture, education, and civic participation."],
      ["Crowdfunding", "To raise small contributions from many people online.", "Creators and causes needed alternatives to banks, grants, and investors.", "Digital platforms bundled storytelling, payments, and social sharing.", "It changed product launches, art, charity, and public participation in funding."],
      ["Disaster Early Warning System", "To alert people before hazards become deadly.", "Communities learned that minutes of warning can save lives.", "Sensors, forecasts, communication networks, and drills turn risk into action.", "They reduce deaths from storms, floods, tsunamis, and heat waves."],
      ["311 Civic Hotline", "To make non-emergency city services easier to request.", "Residents needed one simple route for issues like potholes or streetlights.", "A shared number and tracking system organized civic feedback.", "It improved municipal responsiveness and created useful urban data."]
    ],
    "Research Methods": [
      ["Randomized Controlled Trial", "To test whether an intervention causes an effect.", "Medicine and social science needed stronger evidence than observation alone.", "Random assignment balances hidden differences between groups.", "It became a gold standard for evaluating treatments and policies."],
      ["Double-blind Study", "To reduce bias from both participants and researchers.", "Expectations can influence symptoms, measurements, and interpretation.", "Neither side knows who received which treatment during the study.", "It improved trust in clinical trials and psychological experiments."],
      ["Peer Review", "To check research before publication using expert scrutiny.", "Scientific communities needed quality control and shared standards.", "Independent reviewers evaluate methods, claims, and significance.", "It catches errors, improves papers, and shapes academic credibility."],
      ["Survey Sampling", "To learn about a population without asking everyone.", "Polling and social research needed efficient representative data.", "Careful sampling lets a smaller group estimate a larger one.", "It supports elections, public health, markets, and social science."],
      ["Case Study Method", "To understand complex situations in rich detail.", "Researchers studying organizations, communities, or rare events needed depth.", "It combines multiple sources around one bounded case.", "It reveals mechanisms and context that broad surveys can miss."],
      ["Field Experiment", "To test ideas in real-world settings.", "Lab findings do not always survive contact with daily life.", "Researchers manipulate a variable while observing natural behavior.", "It strengthens evidence in education, economics, politics, and design."],
      ["Longitudinal Study", "To track change over time rather than one moment.", "Questions about aging, development, and risk require repeated observation.", "The same participants or systems are studied across years.", "It reveals trajectories, delayed effects, and life-course patterns."],
      ["Meta-analysis", "To combine results from many studies systematically.", "Single studies can be noisy or underpowered.", "Statistical synthesis estimates the overall pattern of evidence.", "It helps medicine, education, and policy make decisions from many findings."],
      ["Ethnography", "To understand culture and behavior from inside daily life.", "Anthropologists and social researchers needed context-rich observation.", "Researchers immerse, observe, interview, and interpret meanings.", "It reveals lived experience behind numbers and policies."],
      ["Citizen Science", "To let the public contribute to research data and discovery.", "Large questions often need more eyes, locations, or time than labs have.", "Volunteers collect, classify, or analyze data with scientists.", "It expands research capacity and brings communities into science."],
      ["A/B Test", "To compare two versions of a design or message.", "Digital products needed fast evidence about user behavior.", "Users are randomly shown variants and outcomes are measured.", "It shaped web design, marketing, product decisions, and ethics debates."],
      ["Systematic Review", "To summarize all relevant evidence using transparent criteria.", "Decision-makers needed more than cherry-picked studies.", "Researchers define search, inclusion, and appraisal rules in advance.", "It supports evidence-based medicine, policy, and research planning."],
      ["Control Group", "To know what would happen without the tested intervention.", "Effects can be confused with time, attention, or background change.", "A comparison group creates a baseline for interpretation.", "It is central to experiments in science, medicine, and education."],
      ["Lab Notebook", "To preserve observations, decisions, and mistakes during research.", "Research needs a memory that can be audited and repeated.", "A dated record connects procedures, data, and reasoning.", "It supports reproducibility, patents, teamwork, and scientific integrity."],
      ["Reproducibility Checklist", "To make research easier for others to verify.", "Science faced concerns about hidden methods and fragile results.", "Checklists prompt authors to share data, code, materials, and assumptions.", "They improve transparency and help build cumulative knowledge."]
    ],
    "Weird Inventions": [
      ["Pet Rock", "To sell a low-maintenance pet as a joke product.", "A 1970s novelty wave rewarded clever packaging and humor.", "The product was mostly story, instructions, and timing.", "It became a case study in marketing, fads, and perceived value."],
      ["Baby Cage", "To give apartment babies outdoor air when balconies were scarce.", "Early twentieth-century health advice emphasized fresh air.", "A wire enclosure attached outside some urban windows.", "It shows how design can follow real concerns in alarming ways."],
      ["Amphicar", "To create one vehicle that could drive on roads and float on water.", "Postwar consumers loved futuristic hybrid machines.", "It combined car wheels with a watertight body and propellers.", "It became a memorable example of charming but niche transport design."],
      ["Segway", "To move individuals through cities with a self-balancing vehicle.", "Inventors imagined a new category between walking and driving.", "Gyroscopes and motors balanced the rider dynamically.", "It influenced mobility tech but struggled with infrastructure and social fit."],
      ["Umbrella Hat", "To keep hands free while staying dry or shaded.", "Outdoor vendors, fishers, and novelty designers wanted wearable shelter.", "A small canopy moved rain protection onto the head.", "It remains both practical in niches and instantly comedic."],
      ["Inflatable Furniture", "To make furniture cheap, portable, and easy to store.", "Plastic manufacturing and pop culture embraced temporary living.", "Air became the structure inside sealed plastic forms.", "It influenced dorm rooms, events, camping, and playful interior design."],
      ["Shoe-fitting Fluoroscope", "To show whether shoes fit using live X-ray images.", "Shoe stores once marketed scientific-looking fitting experiences.", "Customers viewed foot bones inside shoes, often without radiation awareness.", "It became a cautionary tale about novelty, safety, and regulation."],
      ["Smell-O-Vision", "To add scents to movies for a more immersive experience.", "Cinema innovators competed with television by adding sensory spectacle.", "Timed scent release attempted to match scenes on screen.", "It failed commercially but anticipated multisensory media experiments."],
      ["CueCat Scanner", "To connect printed codes to websites by scanning with a home device.", "Early internet marketing searched for bridges between magazines and web pages.", "A cat-shaped barcode reader translated print marks into URLs.", "It became famous for awkward adoption and privacy concerns."],
      ["Chess Automaton", "To amaze audiences with a machine that appeared to play chess.", "The eighteenth-century Mechanical Turk toured Europe as a marvel.", "Its trick was hidden human operation rather than true automation.", "It shaped public imagination about machines, intelligence, and deception."],
      ["Monowheel", "To make a one-wheeled motor vehicle compact and futuristic.", "Inventors repeatedly tried radical personal transport forms.", "The rider sits inside or near a giant driven wheel.", "It remains a lesson in stability, visibility, braking, and spectacle."],
      ["Selfie Toaster", "To burn a person's portrait onto toast.", "Personalized novelty products grew with online customization.", "A custom heating plate changes browning patterns on bread.", "It turns breakfast into a tiny example of manufacturing-as-entertainment."],
      ["Anti-eating Face Mask", "To stop snacking through an extreme physical barrier.", "Victorian and early diet gadgets often mixed morality, health, and control.", "A cage-like mask blocked access to the mouth.", "It reveals how inventions can encode social anxieties, not just solve needs."],
      ["Car Coffee Maker", "To brew coffee while driving or traveling.", "Automobile accessories promised convenience on the road.", "Compact heating elements adapted kitchen routines to vehicles.", "It previewed today's obsession with mobile comfort and risk management."],
      ["Walking Sleeping Bag", "To stay warm while moving around camp.", "Outdoor gear designers experimented with wearable insulation.", "Leg openings transformed a sleeping bag into awkward clothing.", "It shows the thin line between practical niche gear and visual absurdity."]
    ]
  };

  const DETECTIVE_CARDS = Object.entries(CARD_SEEDS).flatMap(([category, rows]) =>
    rows.map((row) => ({
      name: row[0],
      problem: row[1],
      context: row[2],
      innovation: row[3],
      impact: row[4],
      category
    }))
  );

  const MYTHS = [
    { statement: "Humans use only 10% of their brain.", answer: false, explanation: "Brain imaging shows activity distributed across the brain, even during simple tasks." },
    { statement: "Goldfish have 3-second memories.", answer: false, explanation: "Goldfish can learn routines, recognize cues, and remember tasks far longer than three seconds." },
    { statement: "Sugar reliably makes children hyperactive.", answer: false, explanation: "Controlled studies have not found a consistent sugar-to-hyperactivity effect, though expectations can change perception." },
    { statement: "Lightning never strikes the same place twice.", answer: false, explanation: "Tall objects are struck repeatedly; the Empire State Building is hit many times in some years." },
    { statement: "Bats are blind.", answer: false, explanation: "Bats can see, and many also use echolocation to navigate and hunt." },
    { statement: "Bulls are enraged by the color red.", answer: false, explanation: "Bulls react mostly to movement, not the color of the cloth." },
    { statement: "The Great Wall of China is visible from the Moon with the naked eye.", answer: false, explanation: "It is not visible from the Moon without aid; the claim greatly exaggerates human vision." },
    { statement: "Chameleons change color mainly to hide from predators.", answer: false, explanation: "Color change often communicates mood, temperature, and social signals, not just camouflage." },
    { statement: "Cracking your knuckles causes arthritis.", answer: false, explanation: "Research has not shown knuckle cracking to cause arthritis, though it can annoy nearby people." },
    { statement: "Vikings commonly wore horned helmets in battle.", answer: false, explanation: "The horned helmet image is mostly a later artistic and theatrical invention." },
    { statement: "Humans have only five senses.", answer: false, explanation: "Humans also sense balance, body position, temperature, pain, and more." },
    { statement: "Hair and nails keep growing after death.", answer: false, explanation: "Skin dries and retracts, making hair and nails appear longer." },
    { statement: "Coffee stunts your growth.", answer: false, explanation: "Caffeine can affect sleep and jitters, but it has not been shown to stunt height." },
    { statement: "Toilets flush in opposite directions because of the hemisphere.", answer: false, explanation: "Toilet design and water jets dominate; the Coriolis effect is far too weak at that scale." },
    { statement: "Shaving makes hair grow back thicker.", answer: false, explanation: "Shaving cuts hair bluntly, which can make regrowth feel coarser without changing the follicle." },
    { statement: "Fortune cookies were invented in China.", answer: false, explanation: "They became popular in the United States and are linked to Japanese American and Chinese American restaurant culture." },
    { statement: "Bananas are botanical berries.", answer: true, explanation: "Botanically, bananas develop from a flower with one ovary and meet the berry definition." },
    { statement: "Strawberries are true botanical berries.", answer: false, explanation: "Strawberries are aggregate accessory fruits, not botanical berries." },
    { statement: "Honey can remain edible for extremely long periods if sealed properly.", answer: true, explanation: "Low water content, acidity, and natural chemistry make sealed honey very resistant to spoilage." },
    { statement: "Octopuses have three hearts.", answer: true, explanation: "Two pump blood to the gills, and one pumps it to the rest of the body." },
    { statement: "Sharks are older than trees.", answer: true, explanation: "Shark ancestors appeared before the first forests spread across land." },
    { statement: "The Eiffel Tower can become slightly taller in hot weather.", answer: true, explanation: "Thermal expansion makes its metal structure expand by a small amount." },
    { statement: "A day on Venus is longer than a year on Venus.", answer: true, explanation: "Venus rotates so slowly that one rotation takes longer than one orbit around the Sun." },
    { statement: "Sound can travel through empty space.", answer: false, explanation: "Sound needs matter to vibrate, so it cannot travel through a vacuum." },
    { statement: "The Sun is a star.", answer: true, explanation: "The Sun is the star at the center of our solar system." },
    { statement: "Sunlight takes about eight minutes to reach Earth.", answer: true, explanation: "Light from the Sun travels roughly 150 million kilometers to Earth in about eight minutes." },
    { statement: "The North Star is the brightest star in the night sky.", answer: false, explanation: "Sirius appears brighter; Polaris is famous because it sits near the north celestial pole." },
    { statement: "Mount Everest is the closest point on Earth to outer space.", answer: false, explanation: "Because Earth bulges at the equator, Mount Chimborazo's summit is farther from Earth's center." },
    { statement: "Humans and non-avian dinosaurs lived at the same time.", answer: false, explanation: "Non-avian dinosaurs died out about 66 million years before modern humans." },
    { statement: "Glass is a very slow liquid.", answer: false, explanation: "Glass is an amorphous solid; old window thickness mostly reflects manufacturing methods." },
    { statement: "Pure water is an excellent conductor of electricity.", answer: false, explanation: "Pure water conducts poorly; dissolved ions usually carry most of the current." },
    { statement: "Microwave ovens cook food from the inside out.", answer: false, explanation: "Microwaves penetrate only a limited depth, and heat then spreads through the food." },
    { statement: "Vaccines contain microchips.", answer: false, explanation: "This is a conspiracy claim, not a fact about vaccine ingredients or delivery." },
    { statement: "Antibiotics kill viruses.", answer: false, explanation: "Antibiotics target bacteria; they do not treat viral infections like colds or flu." },
    { statement: "Cold weather alone gives you a cold.", answer: false, explanation: "Colds are caused by viruses, though cold weather can change behavior and transmission patterns." },
    { statement: "Astronauts can see city lights at night from orbit.", answer: true, explanation: "City lights are visible from low Earth orbit, especially on the night side of Earth." },
    { statement: "The tongue has separate zones for each taste.", answer: false, explanation: "Taste receptors are distributed across the tongue, though sensitivity varies by region." },
    { statement: "Carrots give ordinary people dramatic night vision.", answer: false, explanation: "Vitamin A matters for vision, but extra carrots do not grant superhuman night sight." },
    { statement: "Humans emit a faint visible glow.", answer: true, explanation: "Human bodies emit ultraweak visible light, but it is far too dim for our eyes to notice." },
    { statement: "Many bacteria live in and on the human body.", answer: true, explanation: "The human microbiome includes many helpful and harmless microbes." },
    { statement: "The Sahara is the largest desert on Earth.", answer: false, explanation: "Antarctica is the largest desert because deserts are defined by low precipitation." },
    { statement: "Antarctica is a desert.", answer: true, explanation: "It receives very little precipitation, even though it is covered in ice." },
    { statement: "Lightning can be hotter than the surface of the Sun.", answer: true, explanation: "A lightning channel can briefly reach temperatures hotter than the Sun's visible surface." },
    { statement: "Most diamonds are formed from compressed coal.", answer: false, explanation: "Most natural diamonds formed deep in Earth from carbon sources older than coal deposits." },
    { statement: "Napoleon Bonaparte was extremely short for his time.", answer: false, explanation: "He was close to average height for a Frenchman of his era." },
    { statement: "Albert Einstein failed mathematics as a student.", answer: false, explanation: "Einstein was strong in mathematics early; the story is a persistent myth." },
    { statement: "The Great Pyramid was built by aliens.", answer: false, explanation: "Archaeological evidence points to human engineering, labor organization, and Egyptian society." },
    { statement: "The internet and the World Wide Web are the same thing.", answer: false, explanation: "The internet is the network; the web is one service that runs on it." },
    { statement: "Incognito mode makes you anonymous to every website.", answer: false, explanation: "It mainly limits local browser history; websites, networks, and services can still identify activity." },
    { statement: "Deleted files always disappear from storage instantly.", answer: false, explanation: "Often the reference is removed first, while data may remain until overwritten." },
    { statement: "More megapixels always mean a better camera.", answer: false, explanation: "Lens quality, sensor size, processing, light, and dynamic range also matter." },
    { statement: "AI systems understand the world exactly like humans do.", answer: false, explanation: "AI can model patterns and produce useful outputs without human-like experience or understanding." },
    { statement: "Wi-Fi signals are sound waves.", answer: false, explanation: "Wi-Fi uses electromagnetic radio waves, not sound waves." },
    { statement: "QR codes can store text without needing the internet.", answer: true, explanation: "A QR code can directly encode text, contact details, or other data." },
    { statement: "Airplanes routinely dump toilet waste during flights.", answer: false, explanation: "Aircraft waste is stored in tanks and removed on the ground." },
    { statement: "Umami is a basic taste.", answer: true, explanation: "Umami is a recognized savory taste associated with glutamate." },
    { statement: "Blood inside your veins is blue.", answer: false, explanation: "Human blood is red; veins can look blue because of light scattering through skin." },
    { statement: "Oxygen is the most abundant gas in Earth's atmosphere.", answer: false, explanation: "Nitrogen is the most abundant gas, making up about 78% of the atmosphere." },
    { statement: "You must wait 24 hours before reporting a missing person.", answer: false, explanation: "In urgent situations, reports should be made immediately." },
    { statement: "Most body heat is lost through the head.", answer: false, explanation: "Heat loss depends on exposed surface area; uncovered heads lose heat because they are uncovered." },
    { statement: "The Moon has a permanent dark side that never gets sunlight.", answer: false, explanation: "The far side gets sunlight too; we just do not see it from Earth." },
    { statement: "The Moon is slowly moving away from Earth.", answer: true, explanation: "Laser measurements show the Moon recedes by a few centimeters per year." },
    { statement: "Tides are caused only by the Moon.", answer: false, explanation: "The Sun also contributes to tides, especially during spring tides." },
    { statement: "Seasons happen because Earth is closer to the Sun in summer.", answer: false, explanation: "Seasons are mainly caused by Earth's axial tilt." },
    { statement: "Earth is a perfect sphere.", answer: false, explanation: "Earth is slightly flattened at the poles and bulges at the equator." },
    { statement: "Identical twins have identical fingerprints.", answer: false, explanation: "Fingerprints are shaped by developmental conditions as well as genetics." },
    { statement: "People are strictly left-brained or right-brained personality types.", answer: false, explanation: "Brain functions are lateralized, but the personality split is oversimplified." },
    { statement: "Memory works like a video recorder.", answer: false, explanation: "Memory is reconstructive and can change with context, attention, and later information." },
    { statement: "Lie detectors can reliably detect lies directly.", answer: false, explanation: "Polygraphs measure physiological arousal, not lies themselves." },
    { statement: "Multitasking usually reduces performance on demanding tasks.", answer: true, explanation: "Switching attention has costs, especially for complex work." },
    { statement: "Sleep helps consolidate memory.", answer: true, explanation: "Sleep supports learning, memory consolidation, and emotional regulation." },
    { statement: "The brain itself has no pain receptors.", answer: true, explanation: "Pain during brain conditions often comes from surrounding tissues, blood vessels, or membranes." },
    { statement: "Houseflies live only 24 hours.", answer: false, explanation: "Adult houseflies often live for weeks under suitable conditions." },
    { statement: "Camels store water in their humps.", answer: false, explanation: "Humps store fat, which can be metabolized for energy and water byproducts." },
    { statement: "Penguins only live in Antarctica.", answer: false, explanation: "Penguins also live in places such as South Africa, South America, Australia, and the Galapagos." },
    { statement: "All deserts are hot.", answer: false, explanation: "Deserts can be cold; what defines them is very low precipitation." },
    { statement: "The blue whale is the largest animal known to have lived.", answer: true, explanation: "Blue whales exceed the size of any known dinosaur or extinct animal by mass." },
    { statement: "Peanuts are true nuts.", answer: false, explanation: "Peanuts are legumes, related more closely to beans and peas." },
    { statement: "Tomatoes are fruits botanically.", answer: true, explanation: "They develop from the flower's ovary and contain seeds." },
    { statement: "Wombats produce cube-shaped droppings.", answer: true, explanation: "Their intestines shape the feces into distinctive cubes." },
    { statement: "Caffeine severely dehydrates everyone who drinks coffee.", answer: false, explanation: "Caffeinated drinks can contribute to fluid intake for regular consumers." },
    { statement: "Reading in dim light permanently damages your eyes.", answer: false, explanation: "It can cause eye strain, but it is not known to permanently damage eyesight." },
    { statement: "Swallowed gum stays in your stomach for seven years.", answer: false, explanation: "Gum is mostly indigestible but usually passes through the digestive system." },
    { statement: "Lightning can occur during volcanic eruptions.", answer: true, explanation: "Ash particles can build electrical charge and produce volcanic lightning." },
    { statement: "Humans have landed robots on Mars.", answer: true, explanation: "Multiple landers and rovers have operated on the Martian surface." },
    { statement: "There is gravity on the International Space Station.", answer: true, explanation: "Gravity is still strong there; astronauts float because they are in continuous free fall." },
    { statement: "Astronauts float because there is no gravity in orbit.", answer: false, explanation: "They float because the station and astronauts fall around Earth together." },
    { statement: "The first famous computer bug was literally an insect.", answer: true, explanation: "A moth was found in a Harvard computer relay in 1947 and logged as a bug." },
    { statement: "The first email was sent before the public web existed.", answer: true, explanation: "Network email predates the World Wide Web by many years." },
    { statement: "More data always means less bias.", answer: false, explanation: "Large datasets can still encode biased sampling, labels, history, and measurement choices." },
    { statement: "Correlation proves causation.", answer: false, explanation: "Correlation can suggest a relationship, but causation needs stronger evidence." },
    { statement: "Placebos can produce measurable effects.", answer: true, explanation: "Expectations, context, and brain-body pathways can influence symptoms and outcomes." },
    { statement: "Peer review guarantees a paper is correct.", answer: false, explanation: "Peer review can improve work, but mistakes and weak claims can still pass." },
    { statement: "Replication is part of scientific reliability.", answer: true, explanation: "Repeated findings across methods and teams make evidence stronger." },
    { statement: "A single study can settle any complex issue.", answer: false, explanation: "Complex questions usually need converging evidence from many studies." },
    { statement: "Survey wording can change the results.", answer: true, explanation: "Question order, framing, and wording can influence how people answer." },
    { statement: "Random assignment helps reduce bias in experiments.", answer: true, explanation: "It helps balance known and unknown differences between groups." },
    { statement: "Graphs can mislead without containing false numbers.", answer: true, explanation: "Axis scaling, omitted context, and design choices can distort interpretation." },
    { statement: "Natural always means safe.", answer: false, explanation: "Many natural substances are harmful, and safety depends on dose, context, and exposure." },
    { statement: "Organic food is pesticide-free by definition.", answer: false, explanation: "Organic standards can allow certain pesticides and farming inputs." }
  ];

  const IMPOSSIBLE_BASE_QUESTIONS = [
    "Would you upload your mind into a computer?",
    "Is free will an illusion?",
    "Should AI have rights?",
    "Could humanity survive without money?",
    "If a machine feels pain, who is responsible for it?",
    "Would you choose a perfect memory if you could never forget pain?",
    "Can a society be too efficient?",
    "Should we terraform another planet before fixing this one?",
    "Would immortality make life more meaningful or less urgent?",
    "Who owns an idea created by a human and an AI together?",
    "If privacy disappeared, would honesty increase or freedom collapse?",
    "Should every invention require an ethics test before release?",
    "Can a city be designed to make people kinder?",
    "Would you trust a doctor who is always right but never human?",
    "Should future generations get a vote in today's decisions?",
    "Can curiosity be taught, or only protected?",
    "What problem would you solve if failure had no cost?",
    "If memories could be edited, should some memories be protected by law?",
    "Would a world without exams learn more or less?",
    "Should robots be allowed to own property?",
    "Can a lie be ethical if it prevents harm?",
    "Would you live in a simulation if it felt better than reality?",
    "Should extinct species be brought back?",
    "Could a person remain themselves after replacing every body part?",
    "What should be illegal to invent?",
    "If everyone had the same income, what would status become?",
    "Should attention be treated like a natural resource?",
    "Could humanity cooperate against an asteroid faster than against climate change?",
    "Is boredom necessary for creativity?",
    "Would perfect prediction destroy surprise?",
    "Should algorithms explain themselves before making decisions?",
    "Can science answer what a good life is?",
    "Would you erase one bad invention from history if it also erased its benefits?",
    "Is a question more powerful than an answer?",
    "Should schools teach how to detect bad evidence before teaching facts?",
    "Can a society have too much information?",
    "If animals could vote, how would laws change?",
    "Should people be paid for the data they generate?",
    "Would you let a jury use brain scans as evidence?",
    "Can democracy survive deepfake reality?",
    "Should inventions be judged by intent or consequence?",
    "If every language vanished except one, what would humanity lose?",
    "Could a machine be lonely?",
    "Would you rather know the truth or preserve hope?",
    "Should there be a speed limit for technological change?",
    "Can a tradition be innovative?",
    "If medicine could remove fear, should it?",
    "Would you share your dreams if they could be recorded?",
    "Should a child be allowed to choose genetic upgrades?",
    "Can an economy run on reputation instead of money?",
    "What does humanity owe to microbes?",
    "Should the internet have a constitution?",
    "Would perfect translation create peace or erase difference?",
    "Can a museum exhibit change someone's career path in ten seconds?",
    "If time travel existed, would history become unstable?",
    "Should space be protected like a wilderness?",
    "Could a person be addicted to certainty?",
    "Would you trade privacy for a safer city?",
    "Can failure be a public good?",
    "Should every citizen learn basic research methods?",
    "If AI discovers a law of nature, does it understand it?",
    "Could we build a society where nobody is anonymous?",
    "Would you choose to know the date of your death?",
    "Can technology make wisdom easier?",
    "Should there be a right to disconnect from algorithms?",
    "Is progress possible without disagreement?",
    "If a cure is too expensive, is it really a cure?",
    "Could one brilliant question be worth more than a thousand answers?",
    "Would humans explore space if Earth were perfect?",
    "Can a problem be solved so well that people forget it existed?",
    "Should curiosity have a budget line in every institution?",
    "Could a scientific discovery be too dangerous to publish?",
    "Would you trust a government run by evidence dashboards?",
    "Can friendship survive if every interaction is scored?",
    "If nobody owned land, how would cities work?",
    "Should humans deliberately evolve themselves?",
    "Can a machine be creative without wanting anything?",
    "Would you ban a technology that makes people happy but less free?",
    "Should museums collect failed prototypes?",
    "Could the best invention be a new question?",
    "If everyone could read minds, would society become kinder?",
    "Should research be slower when consequences are global?"
  ];

  const IMPOSSIBLE_THEMES = [
    "memory",
    "attention",
    "language",
    "AI doctors",
    "digital identity",
    "gene editing",
    "space mining",
    "climate engineering",
    "brain implants",
    "social media",
    "exams",
    "money",
    "borders",
    "privacy",
    "immortality",
    "algorithms",
    "robots",
    "public health",
    "education",
    "sleep",
    "creativity",
    "luck",
    "failure",
    "cities",
    "oceans",
    "voting",
    "work",
    "friendship",
    "art",
    "truth",
    "attention markets",
    "virtual reality",
    "food systems",
    "research funding",
    "collective intelligence"
  ];

  const IMPOSSIBLE_FRAMES = [
    "Should {theme} be treated as a human right?",
    "Would you let {theme} make decisions for your family?",
    "What would break first if {theme} disappeared tomorrow?",
    "Could a society thrive if {theme} became illegal?",
    "Who should own the data produced by {theme}?",
    "If {theme} became free, what would become more valuable?",
    "Can {theme} be measured without changing it?",
    "Would progress slow down if {theme} had to be approved by everyone?",
    "Is it ethical to optimize {theme} if it reduces surprise?",
    "Could {theme} make people kinder, or only more efficient?",
    "What is the hidden cost of improving {theme}?",
    "If children designed {theme}, what rule would disappear?",
    "Should there be a museum for failed versions of {theme}?",
    "Can {theme} be fair if people disagree about fairness?",
    "Would you choose more {theme} if it meant less freedom?"
  ];

  function unique(values) {
    return [...new Set(values)];
  }

  const IMPOSSIBLE_QUESTIONS = unique([
    ...IMPOSSIBLE_BASE_QUESTIONS,
    ...IMPOSSIBLE_THEMES.flatMap((theme) => IMPOSSIBLE_FRAMES.map((frame) => frame.replace("{theme}", theme)))
  ]).slice(0, 260);

  const RABBIT_FACTS = {
    AI: [
      "AI models learn statistical patterns from examples, not intentions.",
      "A model can be fluent and still be wrong with total confidence.",
      "The first chatbot, ELIZA, was created in the 1960s.",
      "Recommendation systems can shape what people notice, buy, and believe.",
      "Training data choices are design choices, not neutral background noise.",
      "Computer vision systems can be fooled by tiny changes humans barely notice.",
      "Reinforcement learning trains systems through rewards and penalties.",
      "AI alignment asks how to make machine goals match human values.",
      "Generative AI predicts plausible continuations rather than retrieving a single memory.",
      "A small dataset can beat a large one if it is cleaner and more relevant.",
      "Bias can enter through data, labels, objectives, evaluation, or deployment context.",
      "AI-generated images are built from learned visual patterns, not copied pixels alone.",
      "The Turing test measures conversation behavior, not consciousness.",
      "Many AI breakthroughs came from better hardware as much as better algorithms.",
      "Neural networks were inspired by brains but are not digital brains.",
      "Overfitting happens when a model memorizes training examples instead of generalizing.",
      "Explainable AI tries to show why a system made a decision.",
      "AI can discover useful patterns humans did not explicitly program.",
      "A chatbot can simulate empathy without feeling emotion.",
      "Synthetic data can protect privacy, but it can also reproduce hidden bias.",
      "Robots need sensors, motors, planning, and physical safety, not just AI.",
      "Voice assistants combine speech recognition, language processing, and search.",
      "AI in medicine is strongest when paired with clinical judgment and validation.",
      "A model's confidence score is not the same as truth.",
      "Data labeling is often human labor hidden behind automation.",
      "The same AI tool can empower experts and mislead beginners.",
      "AI safety includes cybersecurity, misuse prevention, reliability, and human oversight.",
      "A prompt is a tiny interface for steering a very large system.",
      "The hardest part of AI can be defining the right objective.",
      "The future of AI may depend as much on governance as on code."
    ],
    Space: [
      "A day on Venus is longer than its year.",
      "Neutron stars can spin hundreds of times per second.",
      "The Moon is slowly drifting away from Earth.",
      "Mars has the tallest known volcano in the solar system: Olympus Mons.",
      "Space is not completely empty; it contains particles, fields, and radiation.",
      "Astronauts float in orbit because they are falling around Earth.",
      "The Sun contains more than 99% of the solar system's mass.",
      "Saturn would float in water if there were a bathtub large enough.",
      "The International Space Station circles Earth roughly every 90 minutes.",
      "Comets are leftovers from the early solar system.",
      "A spacesuit is a tiny spacecraft shaped like clothing.",
      "Jupiter's moon Europa likely has an ocean beneath its ice.",
      "The observable universe is limited by the age of light reaching us.",
      "Black holes can be detected by their effects on nearby matter and light.",
      "The first exoplanets around Sun-like stars were confirmed in the 1990s.",
      "Tides are influenced by both the Moon and the Sun.",
      "The cosmic microwave background is ancient light from the early universe.",
      "A solar sail can use light pressure for propulsion.",
      "Meteorites are space rocks that reach the ground.",
      "The asteroid belt is spread out, not a dense field like in movies.",
      "Spacecraft use gravity assists to borrow momentum from planets.",
      "Mercury has ice in permanently shadowed craters despite being close to the Sun.",
      "The Milky Way and Andromeda galaxies are moving toward a future merger.",
      "Radio telescopes can study invisible signals from deep space.",
      "Most stars are red dwarfs, smaller and cooler than the Sun.",
      "The Hubble Space Telescope works above much of Earth's atmosphere.",
      "Rockets work in space by throwing mass backward, not by pushing on air.",
      "Planetary protection rules try to avoid contaminating other worlds.",
      "A lunar day lasts about 29.5 Earth days.",
      "Every space mission is also a materials, energy, and reliability experiment."
    ],
    Psychology: [
      "The Zeigarnik effect describes how unfinished tasks can stay active in memory.",
      "People often remember the peak and the end of an experience more than the average.",
      "Confirmation bias makes people notice evidence that fits what they already believe.",
      "The placebo effect shows that expectations can influence real experiences.",
      "Memory is reconstructed, not replayed like a video file.",
      "Attention is limited; multitasking often means rapid task switching.",
      "Social proof makes people treat others' behavior as information.",
      "The bystander effect can reduce helping when many people are present.",
      "A habit loop often includes a cue, routine, and reward.",
      "People are more loss-averse than gain-seeking in many decisions.",
      "The availability heuristic makes vivid examples feel more common.",
      "Sleep affects learning, emotion, and decision-making.",
      "Dopamine is linked to prediction and motivation, not just pleasure.",
      "The spotlight effect makes people overestimate how much others notice them.",
      "Framing the same facts differently can change choices.",
      "People can feel ownership over objects after touching or customizing them.",
      "The Dunning-Kruger effect concerns gaps between ability and self-assessment.",
      "Tiny environmental cues can influence behavior without people noticing.",
      "Working memory can hold only a limited amount of information at once.",
      "People often prefer familiar things simply because they are familiar.",
      "Emotions can act as fast information about what matters.",
      "Stress can narrow attention toward immediate threats.",
      "Curiosity increases when people sense a gap in what they know.",
      "Group polarization can make discussions push members toward stronger views.",
      "A question can change what people observe next.",
      "Rituals can reduce anxiety by adding structure to uncertainty.",
      "People are better at spotting flaws in others' arguments than their own.",
      "Motivation rises when goals feel specific, achievable, and meaningful.",
      "Awe can make people feel part of something larger than themselves.",
      "Psychology experiments often reveal how much context shapes behavior."
    ],
    Biology: [
      "DNA from a single human cell would stretch about two meters if uncoiled.",
      "Mitochondria have their own DNA, reflecting their ancient bacterial origin.",
      "CRISPR systems began as bacterial defenses against viruses.",
      "The human microbiome helps with digestion, immunity, and chemical signaling.",
      "Some plants can communicate stress through airborne chemicals.",
      "Octopuses have neurons distributed through their arms.",
      "A single teaspoon of healthy soil can contain billions of microbes.",
      "Enzymes are biological catalysts that speed up chemical reactions.",
      "Stem cells can divide and become specialized cell types.",
      "Viruses are not cells; they rely on host cells to reproduce.",
      "Fungi are more closely related to animals than to plants.",
      "Photosynthesis stores sunlight in chemical bonds.",
      "Epigenetic marks can influence gene activity without changing DNA sequence.",
      "The immune system learns from past encounters.",
      "Antibiotic resistance evolves when bacteria survive drug pressure.",
      "Some bacteria can exchange genes with one another.",
      "Bioluminescence evolved many times in different organisms.",
      "The brain uses a large share of the body's energy for its size.",
      "Proteins fold into shapes that determine what they can do.",
      "Cells use membranes to control what enters and leaves.",
      "Coral reefs depend on partnerships between animals and algae.",
      "Yeast helped humans make bread, beer, and scientific discoveries.",
      "The genetic code is shared by nearly all life on Earth.",
      "RNA can carry information and help catalyze reactions.",
      "Some animals regenerate limbs, tails, or organs better than humans can.",
      "Plants sense gravity, light, touch, and chemical signals.",
      "Evolution works on variation that already exists or appears through mutation.",
      "The same gene can have different effects in different environments.",
      "Biofilms make microbes harder to remove and treat.",
      "Life is chemistry organized well enough to copy itself."
    ],
    History: [
      "The Library of Alexandria was part of a larger research culture, not just a building of books.",
      "The printing press made copying information cheaper and faster at massive scale.",
      "Zero as a number was one of humanity's most powerful abstractions.",
      "Ancient Roman concrete could survive seawater for centuries.",
      "The Silk Road moved ideas, diseases, religions, and technologies, not just silk.",
      "Coffeehouses became early hubs for news, debate, and business.",
      "The telegraph made long-distance communication faster than physical travel.",
      "The Green Revolution increased yields but also changed water, fertilizer, and equity debates.",
      "The first universities were social inventions for preserving and testing knowledge.",
      "Standard time zones were pushed by railways and telegraphs.",
      "Maps have often been tools of power as much as tools of navigation.",
      "Paper money spread because trust can be lighter than metal.",
      "Public sanitation projects saved lives before antibiotics existed.",
      "The Industrial Revolution was also an energy revolution.",
      "Navigation improved when clocks became accurate enough to measure longitude.",
      "The Apollo program accelerated materials, computing, and systems engineering.",
      "Many inventions had multiple inventors working independently in similar conditions.",
      "The history of science includes errors that became productive questions.",
      "Museums once mixed science, empire, spectacle, and education.",
      "Vaccination campaigns required logistics, trust, and communication, not just medicine.",
      "The barcode changed retail by turning products into data points.",
      "The Haber-Bosch process reshaped food production and geopolitics.",
      "The first photographs required long exposure times, changing how people posed.",
      "Typewriters influenced office work and women's employment opportunities.",
      "The internet began as a network of research and defense projects.",
      "Urban streetlights changed nightlife, safety, labor, and social rhythms.",
      "The scientific journal created a memory system for discovery claims.",
      "The metric system was designed as a rational standard for measurement.",
      "History often changes when a tool becomes cheap enough for ordinary people.",
      "Every artifact is a frozen answer to an old problem."
    ],
    Technology: [
      "The first computer mouse was made partly of wood.",
      "A QR code can work without internet because the data is inside the pattern.",
      "Touchscreens sense position using changes in electricity, pressure, light, or sound.",
      "Compression makes video calls possible by removing redundant information.",
      "A hard drive stores data using magnetized regions.",
      "Solid-state drives have no spinning disks.",
      "Fiber optics send information as pulses of light through glass.",
      "Bluetooth was named after a Viking-era king associated with unification.",
      "A transistor can act like a tiny switch or amplifier.",
      "Moore's law described a trend in chip density, not a law of physics.",
      "Encryption turns readable information into something useless without a key.",
      "A sensor converts some part of the physical world into data.",
      "Autocorrect combines dictionaries, probability, and user context.",
      "A digital image is a grid of sampled color values.",
      "Refresh rate affects how smooth motion appears on a screen.",
      "GPS works by comparing timing signals from satellites.",
      "A lithium-ion battery stores energy through moving ions between electrodes.",
      "3D printing can create shapes that are difficult to machine traditionally.",
      "Software updates can change the behavior of hardware after you buy it.",
      "Open standards help devices from different companies work together.",
      "The cloud is really someone else's computers connected by networks.",
      "A cache stores recent data nearby so systems can respond faster.",
      "Robotics is hard because the physical world is messy.",
      "A microphone turns air pressure changes into electrical signals.",
      "Modern cars are networks of computers on wheels.",
      "A simple spreadsheet can become a powerful model of reality.",
      "Virtual reality must manage latency to avoid discomfort.",
      "Many technologies fail because of timing, not because the idea is useless.",
      "The best interface often feels invisible after people learn it.",
      "Every technology includes assumptions about who will use it."
    ],
    Economics: [
      "Money is a social technology for storing trust and coordinating exchange.",
      "Prices can act as signals, but they do not capture every value.",
      "Opportunity cost is the value of the best alternative you give up.",
      "Inflation means money buys less over time, but causes can differ.",
      "A market can be efficient and still produce unfair outcomes.",
      "Externalities happen when costs or benefits spill onto others.",
      "Public goods are hard to fund because people can benefit without paying.",
      "Scarcity exists even in rich societies because time and attention are limited.",
      "Insurance pools risk across many people.",
      "Network effects make a service more valuable when more people use it.",
      "A monopoly can reduce competition, but monopolies can arise in different ways.",
      "Behavioral economics studies how real decisions differ from perfectly rational models.",
      "Sunk costs are already spent and should not control future decisions.",
      "Compound interest makes time a powerful financial variable.",
      "GDP measures production, not happiness or fairness directly.",
      "Informal economies can be huge but hard to measure.",
      "Trust reduces transaction costs.",
      "A supply chain is a chain of dependencies, not just deliveries.",
      "Auction design can change who wins and what gets paid.",
      "Microcredit expanded access but works differently across contexts.",
      "A currency is also a confidence system.",
      "Labor markets include power, information, skills, and institutions.",
      "A free product may be paid for with attention or data.",
      "Risk and uncertainty are not the same thing.",
      "Game theory studies strategic choices when outcomes depend on others.",
      "The tragedy of the commons is about unmanaged shared resources.",
      "Economic incentives can backfire if they crowd out intrinsic motivation.",
      "Innovation can create value while destroying old jobs.",
      "A budget is a moral document as well as a spreadsheet.",
      "Economics asks what people do when everything has tradeoffs."
    ],
    "Human Behavior": [
      "People often copy where others are looking.",
      "A queue can make something seem more valuable.",
      "Small delays can change whether people complete a task.",
      "Default options strongly influence choices.",
      "People remember stories more easily than isolated statistics.",
      "Scarcity can make attention narrow toward immediate needs.",
      "People often judge risk by feeling before calculating probability.",
      "Public commitments can make behavior more consistent.",
      "A mirror can make people more self-aware.",
      "Music can change pace, mood, and perceived waiting time.",
      "People value things more after assembling them themselves.",
      "Humor can make information more memorable.",
      "Crowds can be wise when judgments are independent and diverse.",
      "Crowds can also be wrong when everyone copies the same signal.",
      "Status symbols communicate belonging as much as wealth.",
      "A name tag can make interaction easier in unfamiliar groups.",
      "People are more likely to help when given a specific action.",
      "Reciprocity makes favors socially powerful.",
      "Uncertainty can be more stressful than bad news.",
      "People often prefer explanations even when the explanation is shallow.",
      "A visible countdown can reduce anxiety during waiting.",
      "Choice overload can make decisions harder.",
      "People dislike unfairness even when accepting it would benefit them.",
      "Shared attention can make strangers feel briefly connected.",
      "Curiosity spikes when a question is concrete but unresolved.",
      "People scan large text before reading details.",
      "A challenge feels more fun when feedback is immediate.",
      "Social norms can change faster when people see others changing.",
      "Identity shapes what evidence feels threatening.",
      "Designing for behavior means designing for attention, friction, and meaning."
    ],
    Cybersecurity: [
      "Phishing succeeds by exploiting trust and timing, not just technical weakness.",
      "A strong password is less useful if reused everywhere.",
      "Password managers reduce the need to remember many unique passwords.",
      "Two-factor authentication protects accounts when passwords leak.",
      "A software patch often fixes a known security weakness.",
      "The weakest link can be a person, a process, or a forgotten device.",
      "Encryption protects data by making it unreadable without the right key.",
      "Public Wi-Fi risk depends on the network, websites, apps, and device settings.",
      "Social engineering can bypass expensive technical defenses.",
      "Backups are a defense against ransomware and accidental loss.",
      "Zero-day vulnerabilities are flaws unknown to the people who need to fix them.",
      "Security logs are only useful if someone can interpret and act on them.",
      "A QR code can hide a suspicious link behind a convenient pattern.",
      "Biometrics are convenient, but you cannot change your face like a password.",
      "Least privilege means giving systems only the access they truly need.",
      "A firewall filters network traffic based on rules.",
      "Malware can spread through attachments, links, downloads, or compromised software.",
      "Open-source code can be inspected, but inspection is not automatic safety.",
      "Security is a process, not a product you buy once.",
      "A secure system can still fail if recovery plans are weak.",
      "Metadata can reveal patterns even when message content is protected.",
      "CAPTCHAs distinguish humans from bots, but bots keep improving.",
      "Device locks protect against casual access, not every forensic attack.",
      "Supply-chain attacks target trusted tools, updates, or vendors.",
      "Threat modeling asks what can go wrong before it does.",
      "Security usability matters because people route around tools that block work.",
      "A fake sense of urgency is a classic scam signal.",
      "Data minimization means collecting less so there is less to leak.",
      "Cybersecurity combines psychology, law, economics, and engineering.",
      "The best security habit is slowing down when something feels urgent."
    ],
    Future: [
      "The future often arrives unevenly: normal in one place, impossible in another.",
      "Climate adaptation may become as important as climate prevention.",
      "Personalized medicine depends on data, biology, and access.",
      "Cities may compete on resilience, not just size.",
      "The jobs of the future may be bundles of skills rather than fixed titles.",
      "Longevity research raises questions about pensions, family, and meaning.",
      "Cheap sensors could make invisible environmental changes visible.",
      "Synthetic biology treats cells as things we can program, but biology pushes back.",
      "Space industry may start with communication, observation, and robotics before settlement.",
      "Education may shift from memorizing answers to asking better questions.",
      "Water stress could shape migration, food, and diplomacy.",
      "Digital identity may become as important as physical documents.",
      "Autonomous vehicles need social trust as much as sensors.",
      "The future of food may mix farms, labs, microbes, and data.",
      "Aging infrastructure can be a bigger risk than futuristic threats.",
      "Quantum computing is powerful for some problems, not magic for all problems.",
      "The attention economy may face regulation like pollution did.",
      "Future museums may collect datasets and simulations, not only objects.",
      "Human enhancement will challenge ideas of fairness and disability.",
      "Local manufacturing could shorten supply chains for some goods.",
      "AI tutors could personalize learning if access and quality are handled well.",
      "Privacy may become a luxury unless designed as infrastructure.",
      "The next pandemic defense may rely on faster detection and trust networks.",
      "Materials science can change what buildings, batteries, and clothes can do.",
      "Future energy systems will likely mix many sources and storage methods.",
      "Digital twins can simulate cities, factories, bodies, or ecosystems.",
      "The hardest future problems may be coordination problems.",
      "Research culture matters because tools alone do not create wisdom.",
      "A good future may require better questions more than faster answers.",
      "The future is built from prototypes that looked strange at first."
    ]
  };

  const DEFAULT_STATS = {
    curiosity: 0,
    detectiveCorrect: 0,
    detectiveMissed: 0,
    detectiveSeen: 0,
    mythsAnswered: 0,
    mythCorrect: 0,
    vaultSubmissions: 0,
    rabbitFacts: 0
  };

  const DATA_COUNTS = {
    detective: DETECTIVE_CARDS.length,
    myths: MYTHS.length,
    impossible: IMPOSSIBLE_QUESTIONS.length,
    rabbitFacts: Object.values(RABBIT_FACTS).reduce((total, facts) => total + facts.length, 0)
  };

  if (typeof window !== "undefined") {
    window.ARIC_DATA_COUNTS = DATA_COUNTS;
  }

  const state = {
    screen: "home",
    stats: { ...DEFAULT_STATS },
    detective: {
      category: "All",
      index: 0,
      revealed: false,
      scoredCurrent: false
    },
    myth: {
      index: 0,
      correct: 0,
      answered: 0,
      result: null,
      randomMode: false
    },
    impossible: {
      index: 0,
      paused: false,
      timer: null,
      presentation: false
    },
    rabbit: {
      topic: "AI",
      index: 0
    },
    vault: []
  };

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function safeParse(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function safeSave(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      showToast("Local storage is unavailable in this browser.");
    }
  }

  function clampIndex(index, length) {
    return ((index % length) + length) % length;
  }

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function sampleIndex(length, currentIndex = -1) {
    if (length <= 1) {
      return 0;
    }
    let next = Math.floor(Math.random() * length);
    while (next === currentIndex) {
      next = Math.floor(Math.random() * length);
    }
    return next;
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
  }

  function loadState() {
    state.stats = { ...DEFAULT_STATS, ...safeParse(STORAGE_KEYS.stats, {}) };
    const storedQuestions = safeParse(STORAGE_KEYS.vault, []);
    state.vault = Array.isArray(storedQuestions) ? storedQuestions : [];
  }

  function saveStats() {
    safeSave(STORAGE_KEYS.stats, state.stats);
  }

  function saveVault() {
    safeSave(STORAGE_KEYS.vault, state.vault);
  }

  function incrementCuriosity(amount = 1) {
    state.stats.curiosity += amount;
    saveStats();
    renderStats();
  }

  function renderStats() {
    $("curiosityPill").textContent = `Curiosity ${state.stats.curiosity}`;
    $("dashCuriosity").textContent = state.stats.curiosity;
    $("dashMyths").textContent = state.stats.mythsAnswered;
    $("dashVault").textContent = state.vault.length;
    $("statCards").textContent = DATA_COUNTS.detective;
    $("statMyths").textContent = DATA_COUNTS.myths;
    $("statQuestions").textContent = DATA_COUNTS.impossible;
  }

  function dailyQuestion() {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const index = hashString(key) % IMPOSSIBLE_QUESTIONS.length;
    return IMPOSSIBLE_QUESTIONS[index];
  }

  function showScreen(id, silent = false) {
    if (!$(id)) {
      return;
    }
    state.screen = id;
    $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id));
    $$("[data-go]").forEach((button) => button.classList.toggle("active", button.dataset.go === id));
    document.body.classList.toggle("presentation", state.impossible.presentation && id === "impossible");
    if (id === "impossible") {
      startImpossibleTimer();
    } else {
      stopImpossibleTimer();
    }
    if (!silent) {
      incrementCuriosity(1);
    }
  }

  function bindNavigation() {
    $$("[data-go]").forEach((button) => {
      button.addEventListener("click", () => showScreen(button.dataset.go));
    });
    $("fullscreenBtn").addEventListener("click", toggleFullscreen);
    $("randomChallenge").addEventListener("click", randomChallenge);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        showToast("Fullscreen engaged.");
      }).catch(() => {
        showToast("Fullscreen was blocked by the browser.");
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function randomChallenge() {
    const modules = ["detective", "mythbusters", "impossible", "rabbit"];
    const nextModule = modules[Math.floor(Math.random() * modules.length)];
    if (nextModule === "detective") {
      randomDetective();
    } else if (nextModule === "mythbusters") {
      randomMyth();
    } else if (nextModule === "impossible") {
      randomImpossible();
    } else {
      randomRabbit();
    }
    showScreen(nextModule);
    showToast("Random challenge loaded.");
  }

  function detectivePool() {
    if (state.detective.category === "All") {
      return DETECTIVE_CARDS;
    }
    return DETECTIVE_CARDS.filter((card) => card.category === state.detective.category);
  }

  function currentDetectiveCard() {
    const pool = detectivePool();
    state.detective.index = clampIndex(state.detective.index, pool.length);
    return pool[state.detective.index];
  }

  function buildCategoryFilters() {
    const container = $("categoryFilters");
    container.replaceChildren();
    ["All", ...CATEGORIES].forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.classList.toggle("active", category === state.detective.category);
      button.addEventListener("click", () => {
        state.detective.category = category;
        state.detective.index = 0;
        state.detective.revealed = false;
        state.detective.scoredCurrent = false;
        renderDetective();
        buildCategoryFilters();
        incrementCuriosity();
      });
      container.append(button);
    });
  }

  function renderDetective() {
    const pool = detectivePool();
    const card = currentDetectiveCard();
    $("detectiveEmoji").textContent = emojiForCard(card);
    $("detectiveCue").textContent = card.problem;
    $("detectiveCueSub").textContent = "Guess the invention, discovery, method, or social idea behind this cue.";
    $("detectiveCategory").textContent = card.category;
    $("detectiveCounter").textContent = `${state.detective.index + 1} / ${pool.length}`;
    $("detectiveScore").textContent = `Score ${state.stats.detectiveCorrect} : ${state.stats.detectiveMissed}`;
    $("caseHint").textContent = `Category: ${card.category}. Guess the innovation first, then reveal the case notes.`;
    $("revealName").textContent = card.name;
    $("revealProblem").textContent = card.problem;
    $("revealContext").textContent = card.context;
    $("revealInnovation").textContent = card.innovation;
    $("revealImpact").textContent = card.impact;
    $("detectiveCard").classList.toggle("revealed", state.detective.revealed);
    $("detectiveReveal").disabled = state.detective.revealed;
    $("detectiveGotIt").disabled = !state.detective.revealed || state.detective.scoredCurrent;
    $("detectiveMissed").disabled = !state.detective.revealed || state.detective.scoredCurrent;
  }

  function revealDetective() {
    state.detective.revealed = true;
    renderDetective();
    incrementCuriosity();
  }

  function nextDetective() {
    const pool = detectivePool();
    state.detective.index = clampIndex(state.detective.index + 1, pool.length);
    state.detective.revealed = false;
    state.detective.scoredCurrent = false;
    state.stats.detectiveSeen += 1;
    saveStats();
    renderDetective();
    renderStats();
  }

  function randomDetective() {
    const pool = detectivePool();
    state.detective.index = sampleIndex(pool.length, state.detective.index);
    state.detective.revealed = false;
    state.detective.scoredCurrent = false;
    state.stats.detectiveSeen += 1;
    saveStats();
    renderDetective();
    renderStats();
  }

  function scoreDetective(kind) {
    if (!state.detective.revealed || state.detective.scoredCurrent) {
      return;
    }
    if (kind === "correct") {
      state.stats.detectiveCorrect += 1;
      showToast("Case solved.");
    } else {
      state.stats.detectiveMissed += 1;
      showToast("Good miss. That is how research starts.");
    }
    state.detective.scoredCurrent = true;
    incrementCuriosity();
    saveStats();
    renderDetective();
    renderStats();
  }

  function bindDetective() {
    $("detectiveReveal").addEventListener("click", revealDetective);
    $("detectiveNext").addEventListener("click", () => {
      nextDetective();
      incrementCuriosity();
    });
    $("detectiveRandom").addEventListener("click", () => {
      randomDetective();
      incrementCuriosity();
    });
    $("detectiveGotIt").addEventListener("click", () => scoreDetective("correct"));
    $("detectiveMissed").addEventListener("click", () => scoreDetective("missed"));
  }

  function currentMyth() {
    state.myth.index = clampIndex(state.myth.index, MYTHS.length);
    return MYTHS[state.myth.index];
  }

  function renderMyth() {
    const myth = currentMyth();
    $("mythStatement").textContent = myth.statement;
    $("mythCounter").textContent = `${state.myth.index + 1} / ${MYTHS.length}`;
    $("mythScore").textContent = `Score ${state.myth.correct} / ${state.myth.answered}`;
    $("mythMode").textContent = `Random Mode: ${state.myth.randomMode ? "On" : "Off"}`;
    const result = $("mythResult");
    const hasResult = Boolean(state.myth.result);
    result.classList.toggle("visible", hasResult);
    result.classList.toggle("incorrect", hasResult && !state.myth.result.correct);
    $("mythAnswer").textContent = hasResult
      ? `${state.myth.result.correct ? "Correct" : "Not quite"} - Answer: ${myth.answer ? "TRUE" : "FALSE"}`
      : "";
    $("mythExplanation").textContent = hasResult ? myth.explanation : "";
    $("mythTrue").disabled = hasResult;
    $("mythFalse").disabled = hasResult;
  }

  function answerMyth(value) {
    if (state.myth.result) {
      return;
    }
    const myth = currentMyth();
    const correct = myth.answer === value;
    state.myth.result = { selected: value, correct };
    state.myth.answered += 1;
    state.stats.mythsAnswered += 1;
    if (correct) {
      state.myth.correct += 1;
      state.stats.mythCorrect += 1;
    }
    incrementCuriosity();
    saveStats();
    renderMyth();
    renderStats();
  }

  function nextMyth(random = state.myth.randomMode) {
    state.myth.index = random ? sampleIndex(MYTHS.length, state.myth.index) : clampIndex(state.myth.index + 1, MYTHS.length);
    state.myth.result = null;
    renderMyth();
  }

  function randomMyth() {
    nextMyth(true);
  }

  function bindMythbusters() {
    $("mythTrue").addEventListener("click", () => answerMyth(true));
    $("mythFalse").addEventListener("click", () => answerMyth(false));
    $("mythNext").addEventListener("click", () => {
      nextMyth();
      incrementCuriosity();
    });
    $("mythRandom").addEventListener("click", () => {
      randomMyth();
      incrementCuriosity();
    });
    $("mythMode").addEventListener("click", () => {
      state.myth.randomMode = !state.myth.randomMode;
      renderMyth();
      showToast(`Random mode ${state.myth.randomMode ? "on" : "off"}.`);
    });
  }

  function renderImpossible() {
    const stage = document.querySelector(".question-stage");
    stage.classList.remove("swap");
    void stage.offsetWidth;
    $("impossibleQuestion").textContent = IMPOSSIBLE_QUESTIONS[state.impossible.index];
    $("impossibleCounter").textContent = `${state.impossible.index + 1} / ${IMPOSSIBLE_QUESTIONS.length}`;
    $("impossibleStatus").textContent = state.impossible.paused ? "Paused" : "Auto-loop";
    $("impossiblePause").textContent = state.impossible.paused ? "Resume" : "Pause";
    stage.classList.add("swap");
  }

  function nextImpossible(step = 1) {
    state.impossible.index = clampIndex(state.impossible.index + step, IMPOSSIBLE_QUESTIONS.length);
    renderImpossible();
  }

  function randomImpossible() {
    state.impossible.index = sampleIndex(IMPOSSIBLE_QUESTIONS.length, state.impossible.index);
    renderImpossible();
  }

  function startImpossibleTimer() {
    stopImpossibleTimer();
    state.impossible.timer = window.setInterval(() => {
      if (state.screen === "impossible" && !state.impossible.paused) {
        nextImpossible(1);
      }
    }, 9000);
  }

  function stopImpossibleTimer() {
    if (state.impossible.timer) {
      window.clearInterval(state.impossible.timer);
      state.impossible.timer = null;
    }
  }

  function togglePresentation() {
    if (state.screen !== "impossible") {
      showScreen("impossible");
    }
    state.impossible.presentation = !state.impossible.presentation;
    document.body.classList.toggle("presentation", state.impossible.presentation);
    if (state.impossible.presentation && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    showToast(state.impossible.presentation ? "Presentation mode on." : "Presentation mode off.");
  }

  function bindImpossible() {
    $("impossiblePrev").addEventListener("click", () => {
      nextImpossible(-1);
      incrementCuriosity();
    });
    $("impossibleNext").addEventListener("click", () => {
      nextImpossible(1);
      incrementCuriosity();
    });
    $("impossiblePause").addEventListener("click", () => {
      state.impossible.paused = !state.impossible.paused;
      renderImpossible();
      showToast(state.impossible.paused ? "Auto-loop paused." : "Auto-loop resumed.");
    });
    $("presentationMode").addEventListener("click", togglePresentation);
  }

  function buildTopicStrip() {
    const container = $("topicStrip");
    container.replaceChildren();
    Object.keys(RABBIT_FACTS).forEach((topic) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = topic;
      button.classList.toggle("active", topic === state.rabbit.topic);
      button.addEventListener("click", () => {
        state.rabbit.topic = topic;
        state.rabbit.index = 0;
        buildTopicStrip();
        renderRabbit();
        incrementCuriosity();
      });
      container.append(button);
    });
  }

  function renderRabbit() {
    const facts = RABBIT_FACTS[state.rabbit.topic];
    state.rabbit.index = clampIndex(state.rabbit.index, facts.length);
    $("rabbitTopic").textContent = state.rabbit.topic;
    $("rabbitTopicLabel").textContent = state.rabbit.topic;
    $("rabbitFact").textContent = facts[state.rabbit.index];
    $("rabbitCounter").textContent = `${state.rabbit.index + 1} / ${facts.length}`;
  }

  function nextRabbit(step = 1) {
    const facts = RABBIT_FACTS[state.rabbit.topic];
    state.rabbit.index = clampIndex(state.rabbit.index + step, facts.length);
    state.stats.rabbitFacts += 1;
    saveStats();
    renderRabbit();
    renderStats();
  }

  function randomRabbit() {
    const topics = Object.keys(RABBIT_FACTS);
    state.rabbit.topic = topics[Math.floor(Math.random() * topics.length)];
    const facts = RABBIT_FACTS[state.rabbit.topic];
    state.rabbit.index = sampleIndex(facts.length, state.rabbit.index);
    state.stats.rabbitFacts += 1;
    saveStats();
    buildTopicStrip();
    renderRabbit();
    renderStats();
  }

  function bindRabbit() {
    $("rabbitPrev").addEventListener("click", () => {
      nextRabbit(-1);
      incrementCuriosity();
    });
    $("rabbitNext").addEventListener("click", () => {
      nextRabbit(1);
      incrementCuriosity();
    });
    $("rabbitRandom").addEventListener("click", () => {
      randomRabbit();
      incrementCuriosity();
    });
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function renderQuestionList(containerId, questions) {
    const container = $(containerId);
    container.replaceChildren();
    if (!questions.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No visitor questions yet. Be the first one.";
      container.append(empty);
      return;
    }
    questions.forEach((question) => {
      const item = document.createElement("article");
      item.className = "question-item";
      const text = document.createElement("p");
      text.textContent = question.text;
      const actions = document.createElement("div");
      actions.className = "question-actions";
      const meta = document.createElement("small");
      meta.textContent = `${question.likes} likes - ${formatDate(question.createdAt)}`;
      const like = document.createElement("button");
      like.type = "button";
      like.textContent = "Like";
      like.addEventListener("click", () => likeQuestion(question.id));
      actions.append(meta, like);
      item.append(text, actions);
      container.append(item);
    });
  }

  function renderWall() {
    const wall = $("randomWall");
    wall.replaceChildren();
    const source = state.vault.length
      ? shuffle(state.vault).slice(0, 8).map((question) => question.text)
      : shuffle(IMPOSSIBLE_QUESTIONS).slice(0, 8);
    source.forEach((text) => {
      const card = document.createElement("article");
      card.className = "wall-card";
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      card.append(paragraph);
      wall.append(card);
    });
  }

  function renderVault() {
    $("vaultCount").textContent = `${state.vault.length} stored`;
    const recent = [...state.vault].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
    const top = [...state.vault].sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt).slice(0, 6);
    renderQuestionList("recentQuestions", recent);
    renderQuestionList("topQuestions", top);
    renderWall();
    renderStats();
  }

  function likeQuestion(id) {
    const question = state.vault.find((item) => item.id === id);
    if (!question) {
      return;
    }
    question.likes += 1;
    saveVault();
    incrementCuriosity();
    renderVault();
  }

  function submitQuestion(event) {
    event.preventDefault();
    const input = $("questionInput");
    const text = input.value.trim().replace(/\s+/g, " ");
    if (text.length < 8) {
      showToast("Give the vault a question with a little more mystery.");
      return;
    }
    const question = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      likes: 0,
      createdAt: Date.now()
    };
    state.vault.unshift(question);
    state.vault = state.vault.slice(0, 300);
    state.stats.vaultSubmissions += 1;
    input.value = "";
    $("questionLimit").textContent = "0 / 220";
    saveVault();
    saveStats();
    incrementCuriosity(3);
    renderVault();
    showToast("Question added to the vault.");
  }

  function bindVault() {
    $("questionForm").addEventListener("submit", submitQuestion);
    $("questionInput").addEventListener("input", (event) => {
      $("questionLimit").textContent = `${event.target.value.length} / 220`;
    });
    $("shuffleWall").addEventListener("click", () => {
      renderWall();
      incrementCuriosity();
    });
  }

  function bindKeyboard() {
    document.addEventListener("keydown", (event) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : "";
      if (activeTag === "TEXTAREA" || activeTag === "INPUT") {
        return;
      }
      const key = event.key.toLowerCase();
      if ([" ", "arrowright", "arrowleft"].includes(key)) {
        event.preventDefault();
      }
      if (key === "1") showScreen("home");
      if (key === "2") showScreen("detective");
      if (key === "3") showScreen("mythbusters");
      if (key === "4") showScreen("impossible");
      if (key === "5") showScreen("rabbit");
      if (key === "6") showScreen("vault");
      if (key === "h") showScreen("home");
      if (key === "f") toggleFullscreen();
      if (key === "p") togglePresentation();
      if (key === "r") {
        if (state.screen === "detective") randomDetective();
        else if (state.screen === "mythbusters") randomMyth();
        else if (state.screen === "impossible") randomImpossible();
        else if (state.screen === "rabbit") randomRabbit();
        else randomChallenge();
        incrementCuriosity();
      }
      if (key === " " && state.screen === "detective") {
        state.detective.revealed ? nextDetective() : revealDetective();
      }
      if (key === " " && state.screen === "mythbusters" && state.myth.result) {
        nextMyth();
      }
      if (key === " " && state.screen === "impossible") {
        nextImpossible(1);
      }
      if (key === " " && state.screen === "rabbit") {
        nextRabbit(1);
      }
      if (key === "arrowright") {
        if (state.screen === "detective") nextDetective();
        if (state.screen === "mythbusters") nextMyth();
        if (state.screen === "impossible") nextImpossible(1);
        if (state.screen === "rabbit") nextRabbit(1);
      }
      if (key === "arrowleft") {
        if (state.screen === "impossible") nextImpossible(-1);
        if (state.screen === "rabbit") nextRabbit(-1);
      }
    });
  }

  function init() {
    loadState();
    $("dailyQuestion").textContent = dailyQuestion();
    bindNavigation();
    buildCategoryFilters();
    bindDetective();
    bindMythbusters();
    bindImpossible();
    buildTopicStrip();
    bindRabbit();
    bindVault();
    bindKeyboard();
    renderStats();
    renderDetective();
    renderMyth();
    renderImpossible();
    renderRabbit();
    renderVault();
    showScreen("home", true);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
