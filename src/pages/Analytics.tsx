import { useState } from 'react';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, Users, Code, Server, Zap, Globe, Activity, AlertTriangle } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  
  // Sample data for demonstration purposes
  const projectsDeployedData = [
    { month: 'Jan', projects: 30, successful: 28, failed: 2 },
    { month: 'Feb', projects: 45, successful: 41, failed: 4 },
    { month: 'Mar', projects: 60, successful: 57, failed: 3 },
    { month: 'Apr', projects: 50, successful: 45, failed: 5 },
    { month: 'May', projects: 70, successful: 65, failed: 5 },
    { month: 'Jun', projects: 90, successful: 86, failed: 4 },
  ];
  
  const activeUsersData = [
    { month: 'Jan', users: 200, newUsers: 40, returningUsers: 160 },
    { month: 'Feb', users: 250, newUsers: 55, returningUsers: 195 },
    { month: 'Mar', users: 300, newUsers: 70, returningUsers: 230 },
    { month: 'Apr', users: 280, newUsers: 45, returningUsers: 235 },
    { month: 'May', users: 350, newUsers: 85, returningUsers: 265 },
    { month: 'Jun', users: 400, newUsers: 95, returningUsers: 305 },
  ];
  
  const resourceUsageData = [
    { name: 'Compute', value: 400, color: '#8884d8' },
    { name: 'Storage', value: 300, color: '#82ca9d' },
    { name: 'Networking', value: 300, color: '#ffc658' },
  ];
  
  const performanceData = [
    { metric: 'Latency', value: 85, target: 90, unit: 'ms' },
    { metric: 'Uptime', value: 99.95, target: 99.9, unit: '%' },
    { metric: 'Response Time', value: 120, target: 150, unit: 'ms' },
    { metric: 'Error Rate', value: 0.8, target: 1.0, unit: '%' },
  ];
  
  const incidentsData = [
    { id: 1, type: 'Server Outage', status: 'Resolved', time: '2 days ago', impact: 'Medium' },
    { id: 2, type: 'Database Latency', status: 'Investigating', time: '4 hours ago', impact: 'Low' },
    { id: 3, type: 'API Rate Limiting', status: 'Resolved', time: '1 week ago', impact: 'High' },
  ];
  
  const regionData = [
    { name: 'North America', users: 12500, servers: 25 },
    { name: 'Europe', users: 10200, servers: 20 },
    { name: 'Asia', users: 8700, servers: 18 },
    { name: 'South America', users: 3200, servers: 8 },
    { name: 'Africa', users: 1800, servers: 5 },
    { name: 'Oceania', users: 1500, servers: 4 },
  ];

  // Calculate KPI values and changes
  const totalProjects = projectsDeployedData.reduce((sum, item) => sum + item.projects, 0);
  const totalUsers = activeUsersData[activeUsersData.length - 1].users;
  const userGrowth = ((activeUsersData[activeUsersData.length - 1].users / activeUsersData[0].users - 1) * 100).toFixed(1);
  const projectGrowth = ((projectsDeployedData[projectsDeployedData.length - 1].projects / projectsDeployedData[0].projects - 1) * 100).toFixed(1);
  const averageSuccessRate = (projectsDeployedData.reduce((sum, item) => sum + (item.successful / item.projects), 0) / projectsDeployedData.length * 100).toFixed(1);
  
  // Custom progress bar component
  const ProgressBar = ({ value, max, color }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className="h-2 rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    );
  };

  // Responsive layout helper
  const ResponsiveCardContent = ({ children }) => (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your platform's performance and user engagement metrics</p>
        </div>
        <Tabs defaultValue="6m" className="w-full md:w-auto" onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <h3 className="text-2xl font-bold mt-1">{totalProjects}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Code className="text-blue-600" size={20} />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 font-medium">{projectGrowth}%</span>
              <span className="text-gray-500 ml-1">from January</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">{totalUsers}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="text-green-600" size={20} />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 font-medium">{userGrowth}%</span>
              <span className="text-gray-500 ml-1">from January</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Deployment Success</p>
                <h3 className="text-2xl font-bold mt-1">{averageSuccessRate}%</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Zap className="text-purple-600" size={20} />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 font-medium">3.2%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Global Regions</p>
                <h3 className="text-2xl font-bold mt-1">{regionData.length}</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Globe className="text-orange-600" size={20} />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-500">Active in {regionData.length} regions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects Deployed Over Time */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Projects Deployed</CardTitle>
            <CardDescription>Monthly deployment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveCardContent>
              <LineChart data={projectsDeployedData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="projects" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="successful" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="failed" stroke="#ff8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveCardContent>
          </CardContent>
        </Card>
        
        {/* Active Users Over Time */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Monthly active users breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveCardContent>
              <BarChart data={activeUsersData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newUsers" stackId="a" fill="#82ca9d" name="New Users" />
                <Bar dataKey="returningUsers" stackId="a" fill="#8884d8" name="Returning Users" />
              </BarChart>
            </ResponsiveCardContent>
          </CardContent>
        </Card>
        
        {/* Resource Usage Distribution */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Current resource distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveCardContent>
              <PieChart>
                <Pie 
                  data={resourceUsageData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  fill="#8884d8"
                  label
                >
                  {resourceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveCardContent>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key platform performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.metric}</span>
                  <span className="text-sm text-gray-500">Target: {item.target} {item.unit}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">{item.value} {item.unit}</span>
                  <span className={item.value >= item.target ? "text-green-500 text-sm" : "text-amber-500 text-sm"}>
                    {item.value >= item.target ? "On Target" : "Below Target"}
                  </span>
                </div>
                <ProgressBar 
                  value={item.value} 
                  max={item.target * 1.5} 
                  color={item.value >= item.target ? "#10b981" : "#f59e0b"} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
            <CardDescription>Users and infrastructure by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{region.name}</span>
                    <span className="text-sm text-gray-500">{region.users.toLocaleString()} users</span>
                  </div>
                  <ProgressBar 
                    value={region.users} 
                    max={15000} 
                    color={`hsl(${210 + i * 30}, 80%, 60%)`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Platform stability events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidentsData.map((incident) => (
                <div key={incident.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full ${
                    incident.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{incident.type}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        incident.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">{incident.time}</span>
                      <span className={`text-sm font-medium ${
                        incident.impact === 'Low' ? 'text-green-500' : 
                        incident.impact === 'Medium' ? 'text-amber-500' : 'text-red-500'
                      }`}>
                        {incident.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;