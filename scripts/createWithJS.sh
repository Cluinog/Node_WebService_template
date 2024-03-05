#!/bin/bash

# Check if node is installed
# Download the template

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -projectname) project_name="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Check if project name is provided
if [ -z "$project_name" ]; then
    project_name="MyProject"
fi

mkdir temporary
cd temporary/
git init
git remote add origin -f https://github.com/Cluinog/Node_WebService_template

# 
git config core.sparseCheckout true
git pull origin main
git remote remove origin
cd ..
cp -r ./temporary/template ./"${project_name}"

rm -rf temporary
cd "$project_name" || { echo "Directory not found: $project_name"; exit 1; }
npm install

echo "You're ready to go!"