
Interaktiv Map-GeoMap



![Map Screenshot](/public/images/cover.png)

[Video -ya baxmaq ucun ](https://drive.google.com/file/d/11XdKPwID_xJU73D0ZgNviAeJMrsft6fL/view?usp=sharing)
##  Run etmək üçün
```bash
git clone https://github.com/arzummammadova/interactive-map-nextjs.git
cd interactive-map-nextjs

npm i
npm run dev

```

## .env nümüne
NEXT_PUBLIC_MAPBOX_TOKEN=mapboxdakı_tokenin
NEXT_PUBLIC_DEFAULT_CENTER="[49.8671, 40.4093]"
NEXT_PUBLIC_DEFAULT_ZOOM=12



## Tapşırıq necə yerinə yetirildi

Layihəni Next.js ilə yazdım.
2 branchdan istifade etdim main ve intern-map-task
Tailwind CSS ilə dizayn etdim.
iconlar ucun lucide icons textin animasiya ucun framer-motion
Xəritənin göstərilməsi üçün Mapbox istifadə etdim.

Xəritə komponentini client-side yüklədim (dynamic import ilə ssr: false).

Home, Map, Search səhifələrinin hamısında eyni xəritə komponentindən istifadə etdim.

Home Page – center = false olduqda default xəritə göstərilir.

diger Page-lerde .env fayldakı parametrləri oxuyur ona gore merkezlesir , istifadəçi icazə versə xəritəni onun mövqeyinə mərkəzləşdirir.
 
### Hər route üçün hansı data‑fetching metodundan (SSG/CSR) istifadə olunduğunu izah

/  SSG
Sadə səhifə, statik render olunur.
/map CSR Xəritə komponenti dynamic import ilə yalnız brauzerdə yüklənir 
/search CSR (SWR)
API /api/poi çağırışları useSWR ilə client-side edilir



### Map Page 
Markerlərlə məkanları göstərdim.

Kliklənəndə popup açılır (title, description, image və s. göstərilir).

const Map = dynamic(() => import('@/components/Map'), { ssr: false }) istifadə etdim.
SSR zamanı yüklənmir, yalnız brauzerdə göstərilir.

fitBounds istifadə bütün markerlər xəritəyə yerləşsin

### Search Page

/app/api/poi – ada görə POI axtarışı.

SWR istifadə etdim useSWR(url, fetcher)

Loading/Error vəziyyətlərini göstərdim.

Loading zamanı spinner çıxır.
error zamanani netice tapilmadi 
useDebounce hook ilə lazımsız request-lərin qarşısı aldim



### Map component
Mapbox GL JS istifadə olunub
Default zoom və center env.local-dan gəlir
User geolocation dəstəklənir
marker popup var 
GeoJSON Layer

Hüseyn Cavid parkının məlumatlarını götürdüm (XML formatında).

Sonra .geojson-a çevirdim və xəritədə istifadə etdim.
## menbeler

https://youtu.be/elidLLPzmZY?si=AuotN6lvNLbUBTtd

https://nextjs.org/docs/app/getting-started/installation

https://tailwindcss.com/docs/installation/framework-guides/nextjs

https://stackoverflow.com/questions/17958288/branch-and-checkout-using-a-single-command
https://docs.mapbox.com/mapbox-gl-js/guides/install/

https://youtu.be/na3nfLoIXrA?feature=shared

https://www.npmjs.com/package/mapbox-gl
https://latitude.to/map/az/azerbaijan/cities/baku

https://youtu.be/na3nfLoIXrA?feature=shared
https://medium.com/@sainianmol16/build-modern-maps-in-next-js-with-mapbox-and-shadcn-ui-80c276a1e9bf

https://docs.mapbox.com/mapbox-gl-js/guides/


https://www.google.com/maps/place/Elml%C9%99r+Akademiyas%C4%B1+Metro+Stansiyas%C4%B1/@40.3749677,49.8098777,17z/data=!4m10!1m2!2m1!1selmler+metrosu!3m6!1s0x40307dea5b943d51:0x2636058d56be35a4!8m2!3d40.3749677!4d49.8143838!15sCg5lbG1sZXIgbWV0cm9zdZIBFnRyYW5zcG9ydGF0aW9uX3NlcnZpY2WqATYQATIeEAEiGrcnGaQ9meU1wjarzI_LsUUOxucF34ZZsZ9RMhIQAiIOZWxtbGVyIG1ldHJvc3XgAQA!16s%2Fg%2F11c530w61b?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D



https://docs.mapbox.com/api/maps/styles/

https://globe.gl/

https://flowbite.com/docs/components/spinner/

https://swr.vercel.app/

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setcenter


https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
layer

https://docs.mapbox.com/help/glossary/geojson/


https://www.openstreetmap.org/way/277230442#map=16/40.37462/49.81489
xeriteni unvanlari tapmaq park

https://racum.blog/articles/osm-to-geojson/

https://geojson.io/#map=2/0/20

https://mygeodata.cloud/conversion#result 

https://developers.google.com/maps/documentation/javascript/marker-clustering


https://www.dhiwise.com/blog/design-converter/how-to-use-usedebounce-for-better-react-performance




