const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			vehicles: [],
			planets: [],
			favorites: [],
			currentPages: {
                people: 1,
                vehicles: 1,
                planets: 1,
            },
            totalPages: {
                people: null,
                vehicles: null,
                planets: null,
            },
		},
		actions: {
			loadInitialData: async () => {
				const urls = ['https://www.swapi.tech/api/people', 'https://www.swapi.tech/api/vehicles', 'https://www.swapi.tech/api/planets'];
				try {
					const [people, vehicles, planets] = await Promise.all(
						urls.map((url) => fetch(url).then((res) => res.json()))
					);
					setStore({
						people: people.results.map((person, index) => ({ ...person, uid: person.uid || `people-${index}` })),
						vehicles: vehicles.results.map((vehicle, index) => ({ ...vehicle, uid: vehicle.uid || `vehicles-${index}` })),
						planets: planets.results.map((planet, index) => ({ ...planet, uid: planet.uid || `planets-${index}` })),
					});

				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			toggleFavorite: (item) => {
				const store = getStore();
				const exists = store.favorites.find(fav => fav.uid === item.uid);

				if (exists) {
					
					setStore({
						favorites: store.favorites.filter(fav => fav.uid !== item.uid),
					});
				} else {
					
					setStore({
						favorites: [...store.favorites, item],
					});
				}
			},
			mapTypeToImagen: (type) => {


				const typeMap = {
					people: "characters",
					planets: "planets",
					vehicles: "vehicles",
				};
				return typeMap[type] || "unknown";

			},

			fetchData: async (type, page = 1) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/${type}?page=${page}&limit=10`);
                    const data = await response.json();

                    setStore({
                        ...getStore(),
                        [type]: data.results,
                        currentPages: {
                            ...getStore().currentPages,
                            [type]: page,
                        },
                        totalPages: {
                            ...getStore().totalPages,
                            [type]: data.total_pages,
                        },
                    });
                } catch (error) {
                    console.error(`Error fetching ${type} data on page ${page}:`, error);
                }
            },

            handleNextPage: (type) => {
                const store = getStore();
                const actions = getActions();
                const currentPage = store.currentPages[type];
                const totalPages = store.totalPages[type];

                if (currentPage < totalPages) {
                    actions.fetchData(type, currentPage + 1);
                }
            },

            handlePrevPage: (type) => {
                const store = getStore();
                const actions = getActions();
                const currentPage = store.currentPages[type];

                if (currentPage > 1) {
                    actions.fetchData(type, currentPage - 1);
                }
            },

			
		}

	};
}


export default getState;
