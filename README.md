# file-bower-resolver
Bower resolver for file based packages

This resolver will help you host a directory of packages to be installed.

The directory needs to be flat as below

repo/
  test-package-1.0.0.tar.gz
  test-package-1.0.1.tar.gz
  my-pack-1.3.4.tar.gz

## Set up

### Step 1
```javascript
  npm insall file-bower-resolver
```

### Step 2, .bowerrc
``` javascript
{
  "resolvers": [
    "file-bower-resolver"
  ],
  "file-repo" :  "<Path to the directory where you have the tar.gz files>"
}

```
### Step 3
``` javascript
  bower install test-package#1.0.0
```
