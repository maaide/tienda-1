import { HomeSlider } from "../components/ui/HomeSlider"
import { useCategories } from "../hooks"
import { Categories, Spinner } from "../components/ui"
import Head from "next/head"

export default function Home() {

  const { categories, isLoadingCategories } = useCategories('/categories')

  return (
    <>
      <Head>
        <title>Inicio</title>
        <meta name="description" content='Ten tu pagina web para tu tienda, aprovecha nuestros 14 dias para probar nuestros servicios' />  
        <meta name="og:title" content='Inicio' />
        <meta name="og:description" content='Ten tu pagina web para tu tienda, aprovecha nuestros 14 dias para probar nuestros servicios' />
        <meta name="og:image" content='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' />
      </Head>
      <div className="z-0">
        <HomeSlider />
        {
          isLoadingCategories
            ? (
              <div className="flex w-full">
                <div className="m-auto mt-16 mb-16">
                  <Spinner />
                </div>
              </div>
            )
            : <>
              <Categories categories={categories} />
            </>
        }
      </div>
    </>
  )
}
