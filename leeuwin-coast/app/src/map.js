import { handlePromise, isPromiseFinished, qs, qsa, sleep } from '~/utils/common';
const key = 'AIzaSyDoy1acqWxHtDY0J-d_eOCtzVfTmuqEsR8';

let locations;
let leeuwin_addresses = [];
window.fsAttributes = window.fsAttributes || [];

if ('___leeuwin_addresses' in sessionStorage) {
	let arr = JSON.parse(sessionStorage.getItem('___leeuwin_addresses'));
	if (Array.isArray(arr) && arr.length) leeuwin_addresses = [...arr];
}

qs('[data-filters-group]').style.cursor = 'wait';
qsa('[data-filters-group] > *').forEach((el) => (el.style.pointerEvents = 'none'));
qsa('[data-tab-menu] > *').forEach((el) => (el.style.cursor = 'wait'));
qs('[data-tab=map]').style.pointerEvents = 'none';

$(async () => {
	const renderMap = async () => {
		//==========================================
		// Geocode addresses and make map data
		//==========================================
		const items = Array.from(qsa('[fs-cmsfilter-element="list"] > .w-dyn-item'));
		const stores = await Promise.all(
			items.map(async (item, i) => {
				let coords = {};
				let postal_code, state, country;
				const slug = qs('[data-item]', item)?.getAttribute('data-item');
				const title = qs('[data-title]', item)?.textContent.trim();
				const locationHTML = qs('[data-location-address] a', item)?.outerHTML;
				const location = qs('[data-location-address] a', item)?.innerHTML.replaceAll('<br>', ', ').replaceAll('/', '').trim();
				const website = qs('[data-link=website]', item).getAttribute('href');
				const phone = qs('[data-link=phone]', item).getAttribute('href');
				const outlet = qs('[data-outlet]', item).getAttribute('data-outlet');
				const outletTypes = () => {
					let outlets_types_array = [];
					qsa('[data-outlet-type]', item).forEach((p) => {
						let outlet = p.getAttribute('data-outlet-type').trim();
						if (!outlet) return;
						outlets_types_array.push(outlet);
					});
					return `${[...new Set(outlets_types_array)].join(',')}`;
				};
				const products = () => {
					let products_array = [];
					qsa('[data-product-slug]', item).forEach((p) => products_array.push(p.getAttribute('data-product-slug')));
					return `${[...new Set(products_array)].join(',')}`;
				};
				let storedAddress = leeuwin_addresses.find((item) => item.includes(slug));

				if (storedAddress) {
					let addressArray = storedAddress.split(/___/g);
					coords = {
						lat: parseFloat(addressArray[1]),
						lng: parseFloat(addressArray[2])
					};

					postal_code = addressArray[3];
					state = addressArray[4]?.trim();
					country = addressArray[5]?.trim();
				} else {
					if (!location) return console.log(`${title} address not available`);

					const [res, error] = await handlePromise(
						fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${key}`)
					);
					if (error || !res.ok) return console.error(`Geocoding failed for ${title}`);

					try {
						const { results } = await res.json();
						const postal_code_item = results[0]?.address_components.filter((item) => item.types.includes('postal_code'));
						const state_item = results[0]?.address_components.filter((item) => item.types.includes('administrative_area_level_1'));
						const country_item = results[0]?.address_components.filter((item) => item.types.includes('country'));

						postal_code = postal_code_item[0]?.short_name.trim();
						state = state_item[0]?.short_name.trim();
						country = country_item[0]?.short_name.trim();
						coords = results[0]?.geometry?.location || {};
						leeuwin_addresses = [
							`${slug}___${coords?.lat ?? ' '}___${coords?.lng ?? ' '}___${postal_code ?? ' '}___${state ?? ' '}___${country ?? ' '}`,
							...leeuwin_addresses
						];
						sessionStorage.setItem('___leeuwin_addresses', JSON.stringify(leeuwin_addresses));
						await sleep(1000);
					} catch (error) {
						console.error(`Geocoding failed for ${title + ': ' + location}`);
					}
				}

				return {
					name: title,
					lat: coords?.lat,
					lng: coords?.lng,
					address: location,
					postal: postal_code ?? '',
					state: country !== 'AU' ? country : state,
					location_html: locationHTML ?? '',
					website: website && website !== '#' ? website : '',
					phone: phone && phone !== '#' ? phone.split('tel:')[1] : '',
					outlet,
					outletTypes: outletTypes(),
					products: products()
				};
			})
		);
		const locationsObj = stores.filter(Boolean);
		locations = JSON.stringify(locationsObj);

		// console.log(locationsObj);
		//==========================================
		// Add map to container
		//==========================================

		const showMapMessage = () => setTimeout(() => $('.locator-message').fadeIn(300), 500);
		const hideMessage = () => $('.locator-message').hide();
		const hideMap = () => $('.locator-map-container').hide();

		$('#bh-sl-map-container').storeLocator({
			fullMapStart: true,
			dataType: 'json',
			dataRaw: locations,
			distanceAlert: -1,
			lengthUnit: 'km',
			disableAlphaMarkers: true,
			infowindowTemplateID: 'mapiWTemplate',
			listTemplateID: 'mapiWTemplate',
			storeLimit: -1,
			mapSettings: {
				zoom: 0,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				},
				scrollwheel: false,
				mapTypeControl: false,
				fullscreenControl: true,
				streetViewControl: false,
				styles: [
					{
						featureType: 'administrative.country',
						elementType: 'labels.text',
						stylers: [
							{
								lightness: '29'
							}
						]
					},
					{
						featureType: 'administrative.province',
						elementType: 'labels.text.fill',
						stylers: [
							{
								lightness: '-12'
							},
							{
								color: '#796340'
							}
						]
					},
					{
						featureType: 'administrative.locality',
						elementType: 'labels.text.fill',
						stylers: [
							{
								lightness: '15'
							},
							{
								saturation: '15'
							}
						]
					},
					{
						featureType: 'landscape.man_made',
						elementType: 'geometry',
						stylers: [
							{
								visibility: 'on'
							},
							{
								color: '#fbf5ed'
							}
						]
					},
					{
						featureType: 'landscape.natural',
						elementType: 'geometry',
						stylers: [
							{
								visibility: 'on'
							},
							{
								color: '#fbf5ed'
							}
						]
					},
					{
						featureType: 'poi',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'poi.attraction',
						elementType: 'all',
						stylers: [
							{
								visibility: 'on'
							},
							{
								lightness: '30'
							},
							{
								saturation: '-41'
							},
							{
								gamma: '0.84'
							}
						]
					},
					{
						featureType: 'poi.attraction',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'on'
							}
						]
					},
					{
						featureType: 'poi.business',
						elementType: 'all',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'poi.business',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'poi.medical',
						elementType: 'geometry',
						stylers: [
							{
								color: '#fbd3da'
							}
						]
					},
					{
						featureType: 'poi.medical',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'on'
							}
						]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [
							{
								color: '#b0e9ac'
							},
							{
								visibility: 'on'
							}
						]
					},
					{
						featureType: 'poi.park',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'on'
							}
						]
					},
					{
						featureType: 'poi.park',
						elementType: 'labels.text.fill',
						stylers: [
							{
								hue: '#68ff00'
							},
							{
								lightness: '-24'
							},
							{
								gamma: '1.59'
							}
						]
					},
					{
						featureType: 'poi.sports_complex',
						elementType: 'all',
						stylers: [
							{
								visibility: 'on'
							}
						]
					},
					{
						featureType: 'poi.sports_complex',
						elementType: 'geometry',
						stylers: [
							{
								saturation: '10'
							},
							{
								color: '#c3eb9a'
							}
						]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [
							{
								visibility: 'on'
							},
							{
								lightness: '30'
							},
							{
								color: '#e7ded6'
							}
						]
					},
					{
						featureType: 'road',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'on'
							},
							{
								saturation: '-39'
							},
							{
								lightness: '28'
							},
							{
								gamma: '0.86'
							}
						]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: '#ffe523'
							},
							{
								visibility: 'on'
							}
						]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [
							{
								visibility: 'on'
							},
							{
								saturation: '0'
							},
							{
								gamma: '1.44'
							},
							{
								color: '#fbc28b'
							}
						]
					},
					{
						featureType: 'road.highway',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'on'
							},
							{
								saturation: '-40'
							}
						]
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry',
						stylers: [
							{
								color: '#fed7a5'
							}
						]
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry.fill',
						stylers: [
							{
								visibility: 'on'
							},
							{
								gamma: '1.54'
							},
							{
								color: '#fbe38b'
							}
						]
					},
					{
						featureType: 'road.local',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: '#ffffff'
							},
							{
								visibility: 'on'
							},
							{
								gamma: '2.62'
							},
							{
								lightness: '10'
							}
						]
					},
					{
						featureType: 'road.local',
						elementType: 'geometry.stroke',
						stylers: [
							{
								visibility: 'on'
							},
							{
								weight: '0.50'
							},
							{
								gamma: '1.04'
							}
						]
					},
					{
						featureType: 'transit.station.airport',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: '#dee3fb'
							}
						]
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [
							{
								saturation: '46'
							},
							{
								color: '#a4e1ff'
							}
						]
					}
				]
			},
			taxonomyFilters: {
				products: 'productFilters',
				state: 'stateFilters',
				outletTypes: 'outletTypeFilters'
			},
			exclusiveFiltering: true,
			exclusiveTax: ['products', 'state', 'outletTypes'],
			callbackMarkerClick: (marker, _, __, ___, map) => {
				map.panTo(marker.getPosition());
			},
			callbackNoResults: () => {
				hideMap();
				showMapMessage();
			}
		});

		qsa('input[type=checkbox]', qs('[data-filters-group]')).forEach((el) => {
			const targetVal = el.getAttribute('data-value');
			el.addEventListener('change', () => {
				const target = qs(`input[value="${targetVal}"]`, qs('.bh-sl-filters-container'));
				target.checked = !!target.checked;
				target.click();
			});
		});

		qsa('[fs-cmsfilter-element=clear]').forEach((el) => {
			el.addEventListener('click', () => hideMessage());
		});
	};

	const checkMapData = () => {
		return new Promise((resolve) => {
			let i = setInterval(async () => {
				if (await isPromiseFinished(window.fsAttributes?.cmsload?.loading)) {
					clearInterval(i);
					resolve();
				}
			}, 100);
		});
	};

	checkMapData().then(async () => {
		await renderMap();
		qs('[data-filters-group]').style.cursor = '';
		qsa('[data-filters-group] > *').forEach((el) => (el.style.pointerEvents = ''));
		qsa('[data-tab-menu] > *').forEach((el) => (el.style.cursor = ''));
		qs('[data-tab=map]').style.pointerEvents = '';
	});

	let filterCount = 0;
	window.fsAttributes.push([
		'cmsfilter',
		(filterInstances) => {
			const [filterInstance] = filterInstances;
			filterInstance.listInstance.on('renderitems', (renderedItems) => {
				if (filterCount > 0 && renderedItems.length > 0) {
					window.Webflow.destroy();
					window.Webflow.ready();
					window.Webflow.require('ix2').init();
				}
				filterCount++;
			});
		}
	]);
});
