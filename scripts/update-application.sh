#!/bin/bash

PORT=3000 NODE_ENV=demo DEBUG=talkback:* forever stop bin/www



BUILD_ID=dontKillMe PORT=3000 NODE_ENV=demo DEBUG=talkback:* forever start bin/www 



echo 'talkback restarted'

