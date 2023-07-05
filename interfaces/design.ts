export interface IDesign {
    header: {
        topStrip: String
    }
    home: {
        banner: IBanner[],
        category: {
            titleCategory: boolean
            descriptionCategory: boolean
        },
        products: {
            title: string
            sectionProducts: string
        }
    }
    product: {
        sectionProducts: string
    }
    contact: {
        title: string
        text: string
        titleForm: string
    }
    shop: {
        title: string
        description: string
    }
    subscription: {
        title: string
    }
}

export interface IBanner {
    image: string
    title: string
    text: string
    textButton: string
    linkButton: string
}