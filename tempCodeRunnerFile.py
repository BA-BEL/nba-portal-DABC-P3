engine2 = create_engine("sqlite:///data/Bel-db/NBA.sqlite")
Base2 = automap_base()
Base2.prepare(autoload_with=engine2)