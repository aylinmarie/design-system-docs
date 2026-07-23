import { Grid } from '@radix-ui/themes'
import { designSystems } from '../../data/designSystems'
import { DesignSystemCard } from './DesignSystemCard'

export function DesignSystemGrid() {
  return (
    <Grid columns={{ initial: '1', sm: '2' }} gap="3" mb="5">
      {designSystems.map(ds => (
        <DesignSystemCard key={ds.url} {...ds} />
      ))}
    </Grid>
  )
}
