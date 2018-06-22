# ethereum-abi-ui

[![Build Status](https://secure.travis-ci.org/hiddentao/ethereum-abi-ui.svg?branch=master)](http://travis-ci.org/hiddentao/ethereum-abi-ui)
[![codecov](https://codecov.io/gh/hiddentao/ethereum-abi-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/hiddentao/ethereum-abi-ui)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/hiddentao)

A convenience package that makes it easy to build UIs for interacting with Ethereum contracts.

* Works with with any UI framework
* Field sanitization and validation functions
* Minimal dependencies

Example screenshot (from [Meth](https://github.com/meth/app)):

![Demo1](screenshot.png "Demo1")


## Installation

```shell
yarn add ethereum-abi-ui
```

or

```shell
npm install --save ethereum-abi-ui
```

## Example usage

_This is a very basic example to illustrate how you use the API, it only uses jQuery, does not utilize any front-end framework, and is not production-quality code._

```js
import $ from 'jquery'

import {
  FIELD_TYPES,
  canRenderMethodParams,
  renderMethodParams,
  canRenderMethodOutputs,
  renderMethodOutputs
} from 'ethereum-abi-ui'

const ABI = [ /* Solidity contract ABI definition */ ]
const form = $('method')
const output = $('outputs')

const fields = []

// render the input fields for the method params
if (canRenderMethodParams(ABI, 'approve')) {
  renderMethodParams(ABI, 'approve', (name, instance) => {
    switch (instance.fieldType()) {
      case FIELD_TYPES.NUMBER: {
        const input = $(`<input type="number" name="${name}" />`)
        input.instance = instance
        fields.push(input)
        form.append(input)
        break
      }
      case FIELD_TYPES.ADDRESS:
        // ...
        break
      // ...
    }
  })
}

form.submit(() => {
  const values = {}

  fields.forEach(input => {
    // sanitize entered value
    const val = input.instance.sanitize(input.val())

    // check that it's valid
    if (!input.instance.isValid(val)) {
      throw new Error('Please enter valid data')
    }

    // add to final values to send
    values[input.getAttribute('name')] = val
  })

  const results = doWeb3MethodCallUsingFormFieldValues(values)

  // now render the results
  if (canRenderMethodOutputs(ABI, 'approve')) {
    renderMethodOutputs(ABI, 'approve', results, (name, index, instance, result) => {
      output.append(`<p>${name}: ${result}</p>`)
    })
  }
})
```

## API

_TODO_


## Development

* Lint: `yarn lint`
* Test: `yarn test`
* Build: `yarn build`

## Contributors

All contributions welcome. Please see [CONTRIBUTING.md](https://github.com/hiddentao/ethereum-abi-ui/raw/master/CCONTRIBUTING.md)

## License

[MIT](https://github.com/hiddentao/ethereum-abi-ui/raw/master/LICENSE.md)
