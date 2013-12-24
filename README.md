Safeconfig
======
This is a work in progress. =)
I just wanted to add an extra level of security to my flat file storage of some configuration values.
Not too fancy, just a utility to help manage my configuration as well as keep it hidden.

This library works by reading either a previously saved config file from safeconfig, a cleartext JSON object,
or creating a new configuration.

Usage
======

To create a new configuration safeconfig.create(filename,[password])
The only restriction here is that the file should not exist. This will create a new object
to store configuration that resides within safeconfig.

To load either a previously saved configuration, or load a json object from a file
safeconfig.open(filename,[password])
*note to read in a cleartext json object, you should provide no password.

To save a file
safeconfig.close([filename], [password])
Providing no password, will first and foremost read in the previous password (if it was opened with one)
If this object was opened as a cleartext json object, or created without a password. It will be saved as such.
the filename for this method is also optional. If no filename is provided, the filename used to open the configuration
will be re-used.

Adding Configuration Values
once a configuration has been opened or created it is as simple ass
safeconfig.add(key, value, [validation])
both key and value are required, key must be unique, however the value can be a nested object, array, or etc.
validation is optional and is received as a regex, the validation was only intended to be used on string entries.
However, the regex will also be attempted to be applied to objects as well.
 This method will return true on success and false on failure.
example: safeconfig.add("Key", "Value", /\w+/);

Updating a configuration value.
safeconfig.update(key,value,[validation])
this is essentially the same as add, but will allow you to overwrite an existing key.

Deleting configuration values
safeconfig.del(key)
This will delete the key:value pair in the configuration.

Retrieving configuration values
safeconfig.get(key)
this will return the value for the given key.

Retrieve configuration validation for a particular key.
safeconfig.getValidation(key)
This will return the regex that was accepted from a successful add.

To get some information on the current configuration
safeconfig.getInfo()
this will retrieve an object that describes the current configuration.




Encryption
========
Currently this library uses a crypto cipher and the blowfish algorithm.
