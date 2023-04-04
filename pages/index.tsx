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
