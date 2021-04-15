import { createChatBotMessage } from "react-chatbot-kit";
import ChatbotOptions from "./ChatbotOptions";
import CompanyInfoOptions from "./GeneralInformation.jsx/CompanyInfoOptions";
import ProductDescription from "./GeneralInformation.jsx/ProductDescription";
import ProductInfoOptions from "./GeneralInformation.jsx/ProductInfoOptions";
import ProductSpecs from "./GeneralInformation.jsx/ProductSpecs";
import ProductWarranty from "./GeneralInformation.jsx/ProductWarranty";

const config = {
    botName: "ExpressBot",
    initialMessages: [
        createChatBotMessage(`Hello! What can I help you with today`,
            {widget: "chatbotOptions",
            }),
        ],
    state: {
        productInfo: "",
        productWarranty: "",
        productSpecs: "",
        productDesc: "",
    },
    widgets: [
        {
            widgetName: 'chatbotOptions',
            widgetFunc: (props) => <ChatbotOptions {... props} />,
        },
        {
            widgetName: 'companyInfoOptions',
            widgetFunc: (props) => <CompanyInfoOptions {... props} />,
        },
        {
            widgetName: 'productInfoOptions',
            widgetFunc: (props) => <ProductInfoOptions {... props} />,
        },
        {
            widgetName: 'productWarranty',
            widgetFunc: (props) => <ProductWarranty {...props}/>,
            mapStateToProps: ["productWarranty", "productInfo"],
        },
        {
            widgetName: 'productDesc',
            widgetFunc: (props) => <ProductDescription {...props}/>,
            mapStateToProps: ["productDesc", "productInfo"],
        },
        {
            widgetName: 'productSpecs',
            widgetFunc: (props) => <ProductSpecs {...props}/>,
            mapStateToProps: ["productSpecs", "productInfo"],
        },
    ],
}

export default config