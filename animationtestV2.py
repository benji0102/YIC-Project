import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.animation import PillowWriter


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
dt = 0.01          # Time step in years
num_steps = 200   # Number of time steps

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

# Define function to animate plot
def animate(i):

    global x, v, x_traj
    
    if i == 0 or len(x_traj[:i, :]) == 0:
        max_val = 1.0
    else:
        max_val = a_planet*1.1

    # Update position and velocity of planet
    x, v = update_planet(x, v, dt)

    # Add current position to trajectory
    x_traj[i] = x

    # Clear previous plot and plot current position and trajectory
    plt.clf()
    plt.xlim(-max_val, max_val)
    plt.ylim(-max_val, max_val)
    plt.plot(0, 0, 'o', color='orange', markersize=10*M_star)
    plt.plot(x[0], x[1], 'o', color='blue', markersize=10*M_planet)
    plt.plot(x_traj[:i, 0], x_traj[:i, 1], '-', color='gray')

    # Set title and axis labels
    plt.title('Planet Orbit')
    plt.xlabel('x (AU)')
    plt.ylabel('y (AU)')

# Adjust padding between subplots and figure edges
plt.tight_layout()

# Create animation
ani = FuncAnimation(plt.gcf(), animate, frames=num_steps, interval=10)

# Save animation as GIF file
ani.save('orbit.gif', writer=PillowWriter(fps=10))

# Show final plot
plt.show()
