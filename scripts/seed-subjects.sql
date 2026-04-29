-- ============================================================
-- Seed: subjects, topics, subtopics
-- Replace YOUR_USER_ID with your actual user id from auth.users
-- ============================================================

do $$
declare
  v_user_id uuid := 'ed6a809a-e60e-459e-98f4-bfa40dac973a';

  -- Subject IDs (already exist)
  v_bio_id      uuid;
  v_cs_id       uuid;
  v_math_id     uuid;
  v_physics_id  uuid;
  v_geo_id      uuid;
  v_lit_id      uuid;
  v_lang_id     uuid;

  -- Biology topic IDs (already exist)
  v_cell_bio_id   uuid;
  v_genetics_id   uuid;
  v_evolution_id  uuid;
  v_ecology_id    uuid;
  v_human_bio_id  uuid;
  v_micro_id      uuid;
  v_biochem_id    uuid;
  v_plant_bio_id  uuid;

  -- Other topic IDs
  v_topic_id uuid;

begin

  -- ── Get existing subject IDs ─────────────────────────────
  select id into v_bio_id     from subjects where user_id = v_user_id and lower(name) = 'biology';
  select id into v_cs_id      from subjects where user_id = v_user_id and lower(name) = 'computer science';
  select id into v_math_id    from subjects where user_id = v_user_id and lower(name) like '%math%';
  select id into v_physics_id from subjects where user_id = v_user_id and lower(name) = 'physics';
  select id into v_geo_id     from subjects where user_id = v_user_id and lower(name) = 'geology';
  select id into v_lit_id     from subjects where user_id = v_user_id and lower(name) like '%litt%';
  select id into v_lang_id    from subjects where user_id = v_user_id and lower(name) = 'language';

  -- ── Insert missing Biology topics ───────────────────────
  insert into topics (subject_id, name) values
    (v_bio_id, 'Ecology'),
    (v_bio_id, 'Human Biology'),
    (v_bio_id, 'Microbiology');

  -- ── Get existing Biology topic IDs ───────────────────────
  select id into v_cell_bio_id  from topics where subject_id = v_bio_id and lower(name) like '%cell bio%';
  select id into v_genetics_id  from topics where subject_id = v_bio_id and lower(name) like '%genetic%';
  select id into v_evolution_id from topics where subject_id = v_bio_id and lower(name) like '%evol%';
  select id into v_ecology_id   from topics where subject_id = v_bio_id and lower(name) = 'ecology';
  select id into v_human_bio_id from topics where subject_id = v_bio_id and lower(name) = 'human biology';
  select id into v_micro_id     from topics where subject_id = v_bio_id and lower(name) = 'microbiology';
  select id into v_biochem_id   from topics where subject_id = v_bio_id and lower(name) like '%bio%chem%';
  select id into v_plant_bio_id from topics where subject_id = v_bio_id and lower(name) like '%plant%';

  -- ── Biology subtopics ────────────────────────────────────
  insert into subtopics (topic_id, name) values
    (v_cell_bio_id, 'Cell Structure & Organelles'),
    (v_cell_bio_id, 'Cell Division (Mitosis & Meiosis)'),
    (v_cell_bio_id, 'Cell Membrane & Transport'),
    (v_cell_bio_id, 'Cell Cycle'),

    (v_genetics_id, 'DNA Structure & Replication'),
    (v_genetics_id, 'Mendelian Inheritance'),
    (v_genetics_id, 'Mutations'),
    (v_genetics_id, 'Gene Expression'),

    (v_evolution_id, 'Natural Selection'),
    (v_evolution_id, 'Adaptation'),
    (v_evolution_id, 'Speciation'),
    (v_evolution_id, 'Evidence for Evolution'),

    (v_ecology_id, 'Ecosystems & Food Chains'),
    (v_ecology_id, 'Biodiversity'),
    (v_ecology_id, 'Population Dynamics'),
    (v_ecology_id, 'Human Impact on Environment'),

    (v_human_bio_id, 'Digestive System'),
    (v_human_bio_id, 'Circulatory System'),
    (v_human_bio_id, 'Nervous System'),
    (v_human_bio_id, 'Respiratory System'),
    (v_human_bio_id, 'Immune System'),

    (v_micro_id, 'Bacteria'),
    (v_micro_id, 'Viruses'),
    (v_micro_id, 'Fungi'),
    (v_micro_id, 'Immune Response to Pathogens'),

    (v_biochem_id, 'Proteins & Enzymes'),
    (v_biochem_id, 'ATP & Energy'),
    (v_biochem_id, 'Photosynthesis Chemistry'),
    (v_biochem_id, 'Cellular Respiration'),

    (v_plant_bio_id, 'Photosynthesis'),
    (v_plant_bio_id, 'Plant Structure & Function'),
    (v_plant_bio_id, 'Plant Reproduction'),
    (v_plant_bio_id, 'Plant Hormones');

  -- ── Computer Science ─────────────────────────────────────
  insert into topics (subject_id, name) values
    (v_cs_id, 'Data Structures'),
    (v_cs_id, 'Algorithms'),
    (v_cs_id, 'Operating Systems'),
    (v_cs_id, 'Computer Networks'),
    (v_cs_id, 'Databases'),
    (v_cs_id, 'Programming Paradigms'),
    (v_cs_id, 'Computer Architecture');

  select id into v_topic_id from topics where subject_id = v_cs_id and name = 'Data Structures';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Arrays & Linked Lists'),
    (v_topic_id, 'Stacks & Queues'),
    (v_topic_id, 'Trees & Graphs'),
    (v_topic_id, 'Hash Tables'),
    (v_topic_id, 'Heaps');

  select id into v_topic_id from topics where subject_id = v_cs_id and name = 'Algorithms';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Sorting Algorithms'),
    (v_topic_id, 'Searching Algorithms'),
    (v_topic_id, 'Dynamic Programming'),
    (v_topic_id, 'Greedy Algorithms'),
    (v_topic_id, 'Graph Algorithms');

  select id into v_topic_id from topics where subject_id = v_cs_id and name = 'Operating Systems';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Processes & Threads'),
    (v_topic_id, 'Memory Management'),
    (v_topic_id, 'File Systems'),
    (v_topic_id, 'Scheduling');

  select id into v_topic_id from topics where subject_id = v_cs_id and name = 'Databases';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Relational Model'),
    (v_topic_id, 'SQL'),
    (v_topic_id, 'Indexing'),
    (v_topic_id, 'Transactions & ACID'),
    (v_topic_id, 'Normalisation');

  -- ── Mathematics ──────────────────────────────────────────
  insert into topics (subject_id, name) values
    (v_math_id, 'Algebra'),
    (v_math_id, 'Calculus'),
    (v_math_id, 'Statistics & Probability'),
    (v_math_id, 'Geometry'),
    (v_math_id, 'Trigonometry'),
    (v_math_id, 'Linear Algebra'),
    (v_math_id, 'Discrete Mathematics');

  select id into v_topic_id from topics where subject_id = v_math_id and name = 'Algebra';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Equations & Inequalities'),
    (v_topic_id, 'Polynomials'),
    (v_topic_id, 'Functions'),
    (v_topic_id, 'Sequences & Series');

  select id into v_topic_id from topics where subject_id = v_math_id and name = 'Calculus';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Limits'),
    (v_topic_id, 'Derivatives'),
    (v_topic_id, 'Integration'),
    (v_topic_id, 'Differential Equations');

  select id into v_topic_id from topics where subject_id = v_math_id and name = 'Statistics & Probability';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Descriptive Statistics'),
    (v_topic_id, 'Probability Theory'),
    (v_topic_id, 'Distributions'),
    (v_topic_id, 'Hypothesis Testing');

  select id into v_topic_id from topics where subject_id = v_math_id and name = 'Trigonometry';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Trigonometric Functions'),
    (v_topic_id, 'Identities & Equations'),
    (v_topic_id, 'Unit Circle'),
    (v_topic_id, 'Inverse Trigonometry');

  -- ── Physics ──────────────────────────────────────────────
  insert into topics (subject_id, name) values
    (v_physics_id, 'Mechanics'),
    (v_physics_id, 'Thermodynamics'),
    (v_physics_id, 'Electromagnetism'),
    (v_physics_id, 'Waves & Optics'),
    (v_physics_id, 'Modern Physics'),
    (v_physics_id, 'Nuclear Physics');

  select id into v_topic_id from topics where subject_id = v_physics_id and name = 'Mechanics';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Kinematics'),
    (v_topic_id, 'Newton''s Laws'),
    (v_topic_id, 'Work, Energy & Power'),
    (v_topic_id, 'Momentum & Collisions'),
    (v_topic_id, 'Circular Motion');

  select id into v_topic_id from topics where subject_id = v_physics_id and name = 'Thermodynamics';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Temperature & Heat'),
    (v_topic_id, 'Laws of Thermodynamics'),
    (v_topic_id, 'Ideal Gas Laws'),
    (v_topic_id, 'Heat Transfer');

  select id into v_topic_id from topics where subject_id = v_physics_id and name = 'Electromagnetism';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Electric Fields & Forces'),
    (v_topic_id, 'Magnetic Fields'),
    (v_topic_id, 'Electromagnetic Induction'),
    (v_topic_id, 'Circuits');

  select id into v_topic_id from topics where subject_id = v_physics_id and name = 'Waves & Optics';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Wave Properties'),
    (v_topic_id, 'Sound Waves'),
    (v_topic_id, 'Light & Reflection'),
    (v_topic_id, 'Refraction & Lenses');

  -- ── Geology ──────────────────────────────────────────────
  insert into topics (subject_id, name) values
    (v_geo_id, 'Earth Structure'),
    (v_geo_id, 'Plate Tectonics'),
    (v_geo_id, 'Rocks & Minerals'),
    (v_geo_id, 'Geological Time'),
    (v_geo_id, 'Erosion & Weathering'),
    (v_geo_id, 'Volcanoes & Earthquakes');

  select id into v_topic_id from topics where subject_id = v_geo_id and name = 'Plate Tectonics';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Continental Drift'),
    (v_topic_id, 'Tectonic Plate Boundaries'),
    (v_topic_id, 'Seafloor Spreading'),
    (v_topic_id, 'Subduction Zones');

  select id into v_topic_id from topics where subject_id = v_geo_id and name = 'Rocks & Minerals';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Igneous Rocks'),
    (v_topic_id, 'Sedimentary Rocks'),
    (v_topic_id, 'Metamorphic Rocks'),
    (v_topic_id, 'Rock Cycle'),
    (v_topic_id, 'Mineral Properties');

  select id into v_topic_id from topics where subject_id = v_geo_id and name = 'Volcanoes & Earthquakes';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Volcano Types & Formation'),
    (v_topic_id, 'Seismic Waves'),
    (v_topic_id, 'Richter Scale'),
    (v_topic_id, 'Earthquake Zones');

  -- ── Literature ───────────────────────────────────────────
  insert into topics (subject_id, name) values
    (v_lit_id, 'Literary Analysis'),
    (v_lit_id, 'Poetry'),
    (v_lit_id, 'Drama'),
    (v_lit_id, 'Prose & Fiction'),
    (v_lit_id, 'Literary Movements'),
    (v_lit_id, 'Writing Techniques');

  select id into v_topic_id from topics where subject_id = v_lit_id and name = 'Literary Analysis';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Theme & Motif'),
    (v_topic_id, 'Character Analysis'),
    (v_topic_id, 'Narrative Structure'),
    (v_topic_id, 'Symbolism & Imagery');

  select id into v_topic_id from topics where subject_id = v_lit_id and name = 'Poetry';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Poetic Forms'),
    (v_topic_id, 'Rhyme & Meter'),
    (v_topic_id, 'Figurative Language'),
    (v_topic_id, 'Tone & Voice');

  select id into v_topic_id from topics where subject_id = v_lit_id and name = 'Literary Movements';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Romanticism'),
    (v_topic_id, 'Realism & Naturalism'),
    (v_topic_id, 'Modernism'),
    (v_topic_id, 'Postmodernism');

  -- ── Language ─────────────────────────────────────────────
  insert into topics (subject_id, name) values
    (v_lang_id, 'Grammar'),
    (v_lang_id, 'Vocabulary'),
    (v_lang_id, 'Reading Comprehension'),
    (v_lang_id, 'Writing Skills'),
    (v_lang_id, 'Oral Communication'),
    (v_lang_id, 'Language History');

  select id into v_topic_id from topics where subject_id = v_lang_id and name = 'Grammar';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Parts of Speech'),
    (v_topic_id, 'Sentence Structure'),
    (v_topic_id, 'Tenses'),
    (v_topic_id, 'Punctuation');

  select id into v_topic_id from topics where subject_id = v_lang_id and name = 'Writing Skills';
  insert into subtopics (topic_id, name) values
    (v_topic_id, 'Essay Structure'),
    (v_topic_id, 'Argumentative Writing'),
    (v_topic_id, 'Descriptive Writing'),
    (v_topic_id, 'Editing & Proofreading');

end $$;
