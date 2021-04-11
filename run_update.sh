chmod 777 -R node_modules
git stash
git pull
npm install --unsafe-perm 
npm run build --unsafe-perm
rm -rf production/
mkdir production
cp -R dist/* production/
service nginx restart
