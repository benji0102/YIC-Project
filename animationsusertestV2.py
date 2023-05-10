import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.animation import PillowWriter

# Define constants
G = 4*np.pi**2 # Gravitational constant in AU^3/yr^2

# Prompt user for values of host star and planet properties
M_star = float(input("Enter the mass of the host star (in Solar masses): "))
R_star = float(input("Enter the radius of the host star (in Solar radii): "))
M_planet = float(input("Enter the mass of the planet (in Earth masses): "))
R_planet = float(input("Enter the radius of the planet (in Earth radii): "))
a_planet = float(input("Enter the semi-major axis of the planet's orbit (in AU): "))
ecc = float(input("Enter the eccentricity of the planet's orbit: "))
period = np.sqrt(4*np.pi**2*a_planet**3/(G*(M_star + M_planet)))

# Define time step and number of steps
dt = 0.01 # Time step in years
num_steps = 200 # Number of time steps

# Define initial position and velocity of planet
r = a_planet*(1-ecc**2)/(1+ecc*np.cos(0))
x = np.array([r, 0.0])
v = np.array([0.0, np.sqrt(G * M_star * (1+ecc)/(r*(1-ecc)))]) # From Vis-viva equation

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

# Set background to black without gridlines
plt.style.use('dark_background')

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

# Create animation
ani = FuncAnimation(plt.gcf(), animate, frames=num_steps, interval=10)

# Save animation as GIF file
ani.save('orbit.gif', writer=PillowWriter(fps=10))

# Show final plot
plt.show()
