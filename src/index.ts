import { HttpApplication } from './application.http.js'
import { config } from './config.js'
import { container } from './container.js'

const main = async () => {
    const { http } = config
    const app = new HttpApplication(container, http)

    await app.init()
    await app.start()
    process.once('SIGINT', async () => {
        await app.stop()
        process.exit(0)
    })
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
