<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import SidebarMenu from "./SidebarMenu.svelte";
  import blackLogo from '$lib/assets/blacklogo.png';
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<Sidebar.Root>
 <Sidebar.Header>
     <img src={blackLogo} alt="logo" width="100px" height="100px" class="mb-5"/>
 </Sidebar.Header>
 <Sidebar.Content>
  <SidebarMenu/>
 </Sidebar.Content>
 <Sidebar.Footer>
     <Button variant="destructive">
         Logout
     </Button>
 </Sidebar.Footer>
</Sidebar.Root>
