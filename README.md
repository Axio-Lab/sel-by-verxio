<div align="center">

[![logo](https://github.com/Axio-Lab/sel-by-SEL/blob/main/src/assets/images/SEL-logo.png)](https://www.SEL.xyz)

No-code digital commerce protocol powered by Blinks

<h3>
   
[Pitch Deck](https://bit.ly) | [Website](https://sel-by-SEL.netlify.app/) | [Demo Video](https://www.loom.com/share/263660453a8b4bbd87eca843943b2711?sid=3d64ea46-6c8a-4275-8863-72b3882badc7)

</h3>

</div>

<hr />

![banner](https://github.com/Axio-Lab/hublab/blob/bonk/develop/frontend/src/assets/SELBanner.jpg)

SEL helps creators sell digital products directly to their audience, offering tools for setting up storefronts, managing sales, NFT-based proof of purchase, and payment processing in CRYPTO, etc.

The [Digital Commerce payment](https://www.statista.com/outlook/fmo/digital-payments/worldwide#:~:text=Total%20transaction%20value%20in%20the,US%2416.59tn%20by%202028) in the world is projected to grow by 9.52% (2024-2028) resulting in a market volume of US$16.59 trillion in 2028 with over [2.71 billion digital buyers](https://www.oberlo.com/statistics/how-many-people-shop-online) while the global creator economy is estimated to reach $528.39 billion by 2030.

We're building SEL to be the bedrock of this growth by enabling creators and businesses with an all-in-one platform to create, sell, receive payment in CRYPTO, and distribute their products to their audience.

With SEL, creators/businesses can also offer NFTs and Token ownership-based discounts to achieve the following use case:

- Customers receive an NFT-based proof of purchase in place of receipts upon a successful purchase.
- Reward community, brand, or product loyal users based on their Token and NFT ownership.
- Enabling buy-to-redeem commerce by offering nearly 100% discounts to customers who hold TOKEN tokens or the necessary NFTs.

With SEL's tokenized discount feature, creators and businesses can provide discounts to convert users and drive more sales while encouraging users to join their community.

<hr />

![creator workflow image](https://github.com/Axio-Lab/hublab/blob/bonk/develop/frontend/src/assets/SEL%20Workflow%20-%20Creator.png)

1. The creator must log in to their `dashboard` and create an NFT `collection` to use as proof of purchase NFT on the payment page. 
2. The creator should click the start selling icon on the dashboard to create a product instantly. Here they can enable `NFT-gated discount`. `TOKEN-ownership` can also be enabled on the Create product page.
3. Upon completion a product URL is generated that the creator can share with their audience to `start selling`.
4. For every purchase, the creator receives the BONK payment directly in their wallet and then an email notification is sent to them with details of the transaction.

<hr />

![customer workflow image](https://github.com/Axio-Lab/hublab/blob/bonk/develop/frontend/src/assets/SEL%20Workflow%20-%20Customer.png)
1. The customers click on the `product URL` to head to the payment page.
2. When they click the `Buy Now` button, they're redirected to a `checkout` page to make payment with BONK. The checkout page automatically checks if they qualify for the tokenized discount criteria set by the creator.
3. Upon successful payment, the custom `SEL` webhook and BONK cashback program are triggered to execute accordingly, sending them an email notification with a record of the transaction and detail of their purchase.

## Bonk Integration & Overall Impact  🐶
1. BLINK Payment: SEL provides users with an innovative way to create and sell digital product purchases on-chain without allowing users to leave their environment.
   
2. TOKEN ownership-based discounts: Creators can enable buy-to-redeem commerce by offering discounts ranging from 0% to 100% to customers who hold TOKEN.

3. TOKEN Cashback System: Creators can drive sales by incentivizing purchases with TOKEN, encouraging repeat business, attracting new customers, and gaining a competitive edge.

4. SEL Revenue Share: Customers who purchase items on SEL will partake in a 50% revenue split shared based on the X holdings of customers.

<hr />

## Partnerships and Potential Impact 🤝🏼

- We're currently talking with [Stakecut](https://www.stakecut.com) & [Selar](https://selar.co) both are commerce platforms with over 500,000 monthly active users combined and processing millions in monthly revenue, to integrate SEL's tokenized checkout SDK and webhooks built on top of Solana Pay and CandyPay into their existing payment gateway to give their existing merchants and customer access to experience `SEL` in a nutshell.

- We also have network access to over 3000 creators selling to their audience. We intend to onboard a fraction of them to try out `SEL` and we will use their success stories of the platform to make case studies to attract more creators.

- Partnering and listing `SEL` on [Impact](https://impact.com/) which is the world's largest affiliate network with over 200,000 monthly active affiliates who will refer SEL to their audience, email lists, their network of businesses and creators, and community to receive commission payment in TOKEN for any user referred that subscribe to `SEL's` premium plan. 

By allowing people to spend their TOKEN on digital payments innovatively, and integrating full-stack AI-powered on-chain commerce features, `SEL` enhances payment processing, proof of purchase NFT issuance, product distribution, customer incentivization, and loyalty rewards at scale. 

This approach is estimated to onboard millions of people into crypto, driving up the adoption of TOKEN, showcasing Solana’s capabilities, and greatly contributing to the growth of the Solana ecosystem.

<hr />

## Solana & Protocol Integrations ⚙️
1. SEL is integrating [`Underdog Protocol`](https://www.underdogprotocol.com/) to create dynamic/soulbound NFTs, manage NFTs, and connect off-chain workflows, on-chain enabling on-chain marketing automation.
   
2. SEL is building on [`Candypay`](https://candypay.fun/) to enable creators to accept Solana payments with our seamless, mobile native, NFT/ Token-ownership loyalty discount Checkout solution in minutes.

3. SEL also integrates [`Pyth Network's`](https://pyth.network/) Oracle to pull in the TOKEN/USDC price feed, which calculates the TOKEN equivalent that customers must pay for their purchase.

4. SEL uses a [`Cashback Webhook`](https://github.com/Axio-Lab/hublab/tree/bonk/develop/webhook) from the SEL SDK to power the TOKEN cashback program which also sends a notification to both the customer and seller about a purchase transaction and the cashback incentive trigger.
<hr />

## Future Plans & Implementation 🔮
1. Adding features for everything creators need to create, market, sell, and deliver their products online including:
   - AI-powered Sales Pages
   - AI-Powered Sales & Marketing Video Kit (TTS, CV, LLMs)
   - Product Funnels
   - One-click Upsell
   - Email Marketing
   - A/B Testing integrations
   - Workflows integration
   - APIs & Webhooks
   - CRM and other integrations
   - Community

2. Integrating large language model (LLMs) AI agents to automate abandoned carts reach-outs and outbound sales automation to increase creator sales and aid product distribution.
   
3. A telegram bot that allows creators to create their NFT loyalty vouchers, upload their product to `SEL`, obtain a product link to share and start selling their digital products, and accept instant payment with TOKEN (or their preferred SPL token).
   
5. Build out the `SEL` explore page where users and creator communities can discover products by several creators.
   
6. VexList which will be an on-chain collaborative social blacklist where users can share and openly dislike products/services they've had bad experiences with both on `SEL` and generally while getting TOKEN incentive rewards.
   
7. We're also looking to allow creators and businesses to integrate `SEL` on some of the top eCommerce platforms like:
   - WooCommerce
   - Magento
   - BigCommerce
   - Wix
   - Squarespace

