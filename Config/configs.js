const enviroment = process.env.NODE_ENV || 'dev';


const config = () => {
    switch (enviroment) {

        case 'prod':
        return {
            connection_string: 'mongodb+srv://atlas_user:atlas_user2021@atlasoneapi.apmip.mongodb.net/atlasone?retryWrites=true&w=majority',
            jwt_password: 'atlasOne2021inproduction',
            jwt_expires: '1d'
        }
        case 'dev':
        return {
            connection_string: 'mongodb+srv://atlas_user:atlas_user2021@atlasoneapi.apmip.mongodb.net/atlasone?retryWrites=true&w=majority',
            jwt_password: 'atlasOne2021',
            jwt_expires: '7d'
        }       
        
    }
}

console.log(`starting environment${enviroment.toUpperCase()}`);

module.exports = config();