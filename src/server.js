import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'
const  keys = {
    "type": "service_account",
    "project_id": "intecao-compra-hc",
    "private_key_id": "7dc64bc6247ed0cb0d1ec2bc67fe7f1dbe41f529",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQhdH8cdt666Xh\n8m004PDQSe44OciRUROt8rtqyQhAmBpTtizOnR7SPaXy8lkKKAxlHFtqygfYhpHx\nBdVBEhK2MiBvY5E83CkkbE24P7/wFzyGpDtHzcNaEZiEqdn7RLoUlS7K+BTgf2Xr\nDEeNu4tDdV6JqM3CFY3Rq5gv2v5gjuZ/WYYXtewhWVNIKh2bJYro5wE/KLzU6Z0z\nK+GBa9yrJdU9bfyM4jyLYCOSQdfNquEBBvZUL8iVIegSDWa2Ga756giNIgUox1ou\nJi3TCQo2/UmLI43VSNBKJQO+2vGepegX7Xs3AXl3bHZPO/IbVpKGcMv1FEfaAHk1\nHt58FKrhAgMBAAECggEAMAbqZvj4YrbcxY43HetDO84TWorgiavBWxqhlQZJass9\noRM//bSNkUHWs36jCGZR+IXP/mga54GTIo7D39FgUut3sgAeRwS0SynQusOgGxXX\nAHHaH38iY9/Sn5eZV7isHSqBFQmPkWd2W21AG8Ja4IYraIxjG7UoLWcWzcrkNOu6\nZLgec347OOE5l+xbwh75HM8ZV/5+vi5rgvMvHja4ECepOqErKtrQkSS0u5CEMVtk\nchPwnf/cRMIipnzjSsf0yIbAsyBasToZW8ARzg9TjftwJlV82Ml257nTp29z4sns\nPHAiukMi9ap975yDwY+W05O0l/TPjV3rXHytzymRQwKBgQDv4ORNDv/Nwdueou9M\n71F8sOluplols4D2V9A/X3KXLRlDILy3o1oUayMWa9mQ23NNqyRLuv1RPvskE0gL\nDYso776ZruorYTOh21CmrXiRFU9aspZ5yjL0XZHE2N/64kkTi2Htke2KLKu1uA9h\nU7z2I6JP277yIq28ChpJIFTDcwKBgQDeiXP01jGIFxT82W7Rv53Uvt5N+//NwU2f\nf550MLbtrTO7oh36AkBISE9WDkLEIPT4HHp2Qu5vjvXA1q1hbi1EM7ZOAqwhW22E\nPhXA+j8qdUzI76O5nguhCVFxkeIcuuydfcZ6NerC0XcyIn/1j+gYJ+m+qduqOU/t\nn7NmdW3LWwKBgQDRp/3iW/m4HHeXb1E4LPNLyFQ+IacozHsq1BVvTj0ZZJFv2m0X\nE+7nabyBHEJMGYHtoGdYyVYebK2UGkYdYvj+DozIRdjlkU9PaCBVjciTBc0VuIFM\ncS2X5zBAnE0nOiAktO4idijnW6O4b+cBae7+MqbqpWV+vFCcyTewMlHjgQKBgEEb\naeeJ+zfbuPI5EykerKifpx6dybuDAJjXl55a2kozUF1nEuogWnpLXZrJ1VLYaZNl\nkZakAmp1IwVmSZelymyXzJCKS53+x83W9DpffLeJVgu7wOT/jltxBHj7u3G4Zp21\nPKpot+SDsCHk4hcQIVFf7A0yWOg2mGHnRW+Gj7bdAoGAb6a3/8aVv9fMQx14G2L7\ncl4pydO543UhxcMTaTaKjuqTves2TsKUgKUmn2Wy/5Fp3POXK+On0NBjx2DJULd+\nXSzfpnMcM9ob2ReZeAhu66WJebihi5IqUox60JVGA3p0OltMu26X0ABhkQgSBglm\n8487TySjH2AHjeTkeiMTdmQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "servicehc@intecao-compra-hc.iam.gserviceaccount.com",
    "client_id": "102637927540965755756",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/servicehc%40intecao-compra-hc.iam.gserviceaccount.com"
}

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

const gsapi = google.sheets({
    version: 'v4',
    auth: client
})

function abrir(person) {
    client.authorize((error) => {
        if(error) {
            console.log(error)
            return
        } else {
            teste(person).then(() => console.log("cabo")).catch((e) => console.log(e))
        }
    })
}

async function teste(person) {
    const dataArray = [];
    dataArray.push([person.name, person.type, person.email])

    console.log(dataArray)

    const updatedOptions = {
        spreadsheetId:'1X93SHWItHfMQ531GS58k3m_tsTUiYt0X3bJJ6bfhSZc',
        range: 'Data!A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: dataArray
        }
    }
    
    let res = await gsapi.spreadsheets.values.append(updatedOptions)
    console.log(res)
}

const app = express()

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json())

app.post("/cadastrar", (req, res) => {
    abrir(req.body)
    res.sendStatus(200)
})

app.listen(3016)