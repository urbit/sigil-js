import * as React from "react";

import {
  Box,
  Row,
  Rule,
  Text,
  Col,
  Center,
  ItemRow,
  Space,
  Code,
  Icon,
  Anchor,
  styleAnchor,
} from "@tlon/indigo-react";

import { sigil, reactRenderer } from '@tlon/sigil-js'
// import { sigil, reactRenderer } from '../../../dist/index.js'


export default class Home extends React.Component {
  render() {
    console.log(sigil)
    return (
      <Box>
        {
          sigil({
            patp: '~ridlur-figbud',
            renderer: reactRenderer,
            width: 64,
            height: 64
          })
        }
        {
          sigil({
            patp: '~ridlur-figbud',
            renderer: reactRenderer,
            size: 64,
          })
        }
        {
          sigil({
            patp: '~figbud',
            renderer: reactRenderer,
            size: 64,
          })
        }
        {
          sigil({
            patp: '~ridlur',
            renderer: reactRenderer,
            width: 128,
            height: 64,
            margin: 0,
            full: true,
          })
        }
        {
          sigil({
            patp: '~wet',
            renderer: reactRenderer,
            width: 64,
            height: 64
          })
        }
      </Box>
    )
  }
}
