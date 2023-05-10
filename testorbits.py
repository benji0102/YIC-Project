import numpy as np
import matplotlib.pyplot as plt

# Define constants
G = 4*np.pi**2    # Gravitational constant in AU^3/yr^2

# Define host star properties
M_star = 1.0   # Solar mass
R_star = 1.0   # Solar radius

# Define planet properties
M_planet = 0.01    # Earth mass
R_planet = 0.01    # Earth radius
a_planet = 1.0     # Semi-major axis of planet's orbit in AU
period = 1.0       # Orbital period of planet in years

# Define time step and number of steps
dt = 0.005          # Time step in years
num_steps = 1000   # Number of time steps

# Define initial position and velocity of planet
x = np.array([a_planet, 0.0])
v = np.array([0.0, np.sqrt(G * M_star / a_planet)])

# Define function to calculate gravitational force and update position and velocity
def update_planet(x, v, dt):
    r = np.sqrt(x[0]**2 + x[1]**2)
    F_grav = -G * M_planet * M_star * x / r**3
    v += F_grav * dt / M_planet
    x += v * dt
    return x, v

# Define array to store positions of planet at each time step
x_traj = np.zeros((num_steps, 2))
x_traj[0] = x

# Loop through time steps and update position of planet
for i in range(1, num_steps):
    # Update position and velocity of planet
    x, v = update_planet(x, v, dt)
    
    # Store new position of planet in trajectory array
    x_traj[i] = x
    
    # Update plot every 10 time steps
    if i % 10 == 0:
        plt.clf()
        plt.plot(x_traj[:i, 0], x_traj[:i, 1], 'b.')
        plt.plot(0, 0, 'y*', markersize=20)
        
        # Set x and y limits with padding
        max_val = np.amax(x_traj[:i, :])
        min_val = np.amin(x_traj[:i, :])
        plt.xlim(min_val - 0.1, max_val + 0.1)
        plt.ylim(min_val - 0.1, max_val + 0.1)
        
        plt.gca().set_aspect('equal', adjustable='box')
        plt.title('Orbit of planet around host star')
        plt.xlabel('x (AU)')
        plt.ylabel('y (AU)')
        plt.pause(0.01)

# Adjust padding between subplots and figure edges
plt.tight_layout()

# Show final plot
plt.show()