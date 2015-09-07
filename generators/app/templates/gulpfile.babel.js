// generated using <%= name %> <%= version %>
import './task/dev';
<% if (!includeReact) { -%>
import './task/test';
<% } -%>
import './task/prod';
