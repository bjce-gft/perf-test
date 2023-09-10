import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

const operations_api_url = "https://toggens-api.preprod.togg.cloud/v3/api-docs/Toggens%20Operations%20API"

export const options = {
    discardResponseBodies: true,
    scenarios: {
        ex1: {
            executor: 'constant-vus',
            startTime: '0s', 
			vus: 900, 
			duration: '10s',
			exec: 'get_homepage',
        }
    },
};

export function get_homepage() {
	const mainpage = http.batch([
        ['GET', `${operations_api_url}`],
        ['GET', `${operations_api_url}`],
        ['GET', `${operations_api_url}`]
    ])

	check(mainpage[0], {
        [ 's1 ']: (res) =>{
            return res.status === 200
        },
    });
    check(mainpage[1], {
        ['s2 ']: (res) => {
			return res.status === 200
		}
    });
    check(mainpage[2], {
        ['s3  ']: (res) =>{
            return res.status === 200
        } ,
    });
};