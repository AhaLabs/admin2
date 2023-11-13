import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { anOldHope as dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import useCosmWasm from '../../hooks/useCosmWasm';
import { JsonSchemaForm, type JsonSchemaFormDataWrapped } from '..'

export function CosmWasmContract() {
  const { contract, method } = useParams()
  const { schema } = useCosmWasm()
  const [result, setResult] = useState<string>()
  const [category, ref] = (method ?? '').split('::')

  const onSubmit = useMemo(() => async ({ formData }: JsonSchemaFormDataWrapped) => {
    setResult(undefined)
    if (!contract || !method) return
    setResult(JSON.stringify(formData))
  }, [contract, method])

  if (!ref) {
    return (
      <>
        <h1>Example CW Schema</h1>
        <p>
          Taken from <a href="https://github.com/CosmWasm/cw-plus">cw-plus</a> contract {schema.contract_name} v{schema.contract_version}
        </p>
        <p>Raw Schema, generated with <code>cargo schema</code>:</p>
        <SyntaxHighlighter
          style={dark}
          language="json"
          children={JSON.stringify(schema, null, 2)}
          wrapLongLines
        />
      </>
    )
  }

  return (
    <>
      <JsonSchemaForm
        title={schema.contract_name}
        schema={{
          $ref: `#/definitions/${ref}`,
          ...schema[category!],
        }}
        onSubmit={onSubmit}
      >
        {result && (
          <>
            <h1>Result</h1>
            <SyntaxHighlighter
              style={dark}
              language="json"
              children={JSON.stringify(result, null, 2)}
              wrapLongLines
            />
          </>
        )}
      </JsonSchemaForm>
    </>
  )
}
