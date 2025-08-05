import { env } from '../env'
import { app } from './app'

app.listen(env.PORT, () => console.log(`Server is running in port ${env.PORT}`))
